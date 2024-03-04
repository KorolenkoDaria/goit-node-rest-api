import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import "./server.js";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

app.use(express.urlencoded({ extended: false }));
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
