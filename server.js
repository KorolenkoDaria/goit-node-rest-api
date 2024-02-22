import mongoose, { connect } from 'mongoose';
import express from 'express';


const DB_HOST = "mongodb+srv://Korolenko:l3iguC2LCPOUXNw2@cluster0.w3zl1n3.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose.connect(DB_HOST)
  .then(() =>  console.log("Dabase connect "))
  .catch(error => console.log(error.message))