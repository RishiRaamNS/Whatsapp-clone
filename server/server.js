import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1561274",
    key: "792ce2c2aa1e7310bce7",
    secret: "596abbb99b1a1383d26b",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json());

const connection_url = "mongodb+srv://rishiraamns:hellorr@cluster0.rdn6wnr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url);

const db = mongoose.connection;


db.once("open", () => {
    console.log("DB COONECTED");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured", change);
    })
})

app.get("/", (req, res)=> res.status(200).send("Hello World"));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});
app.listen(port, () => console.log(`Listening on localhost:${port}`));