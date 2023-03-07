import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRouter from "./router/student.js";
dotenv.config();

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB;

app.use("/", studentRouter);

mongoose.connect(uri, { dbName: "Tardiverse" }).then(() => {
  app.listen(port, () => {
    console.log("Database is connected");
  });
});
