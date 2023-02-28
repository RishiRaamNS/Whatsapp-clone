import express from "express";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 9000;

const connection_url = "mongodb+srv://rishiraamns:hellorr@cluster0.rdn6wnr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url);

app.get("/", (req, res)=> res.status(200).send("Hello World"));
app.listen(port, () => console.log(`Listening on localhost:${port}`));