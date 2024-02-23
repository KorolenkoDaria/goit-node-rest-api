import dotenv from "dotenv";
dotenv.config();  

import mongoose, { connect } from 'mongoose';
import app from "./index.js";

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);
mongoose.connect(DB_HOST)
  .then(() => { 
    console.log("Database connection successful")
    app.listen(8080)
    })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })