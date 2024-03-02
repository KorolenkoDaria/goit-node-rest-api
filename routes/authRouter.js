import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { register, login, logout, current } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();

const jsonParser = express.json();

authRouter.post("/users/register", jsonParser, validateBody(registerUserSchema), register);
authRouter.post("/users/login", jsonParser, validateBody(loginUserSchema), login);
authRouter.post("/users/logout", jsonParser, authenticate, current, validateBody(loginUserSchema), logout);
authRouter.get("/user/current", authenticate, current )

export default authRouter;