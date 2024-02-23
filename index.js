import dotenv from "dotenv";
dotenv.config();

import express from 'express';
const app = express();



import "./server.js"; 
import contactsRouter from './routes/contactsRouter.js';

app.use(express.urlencoded({ extended: false }));
app.use('/api', contactsRouter);
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
});

export default app;