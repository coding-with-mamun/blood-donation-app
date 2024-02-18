import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoDBConnect from "./config/mongoDB.js";
import uerRouter from "./route/user.js";
import errorHandler from "./middleware/errorHandler.js";

// initialization
const app = express();
dotenv.config();

// enviroment vars
const PORT = process.env.PORT || 9090;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
app.use(express.static("public"));

// routing
app.use("/api/v1/user", uerRouter);

// error handle
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
  mongoDBConnect();
});
