import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());



mongoose
    .connect(databaseUrl)
    .then(() => {
        console.log("Database Successfully Connected")
        app.listen(port, () => {
            console.log(`Server is running on port https://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error.message));


