import express from 'express';
import contactsRouter from './routes/contactsRouter.js';
import mongoose, { connect } from 'mongoose';
import dotenv from "dotenv";

dotenv.config()
const { DB_HOST } = process.env;

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(DB_HOST)
    .then(() => { 
      app.listen(8080,()=>console.log("Connect success"))
    })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
    
app.use(express.urlencoded({ extended: false }));
app.use('/api', contactsRouter);
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
});

export default app;