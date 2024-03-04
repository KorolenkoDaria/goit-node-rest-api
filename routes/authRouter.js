import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userSchemaValidation, userSchemaUpdateSubscription } from "../schemas/usersSchemas.js";
import { register, login, logout, current, updateUserSubscription } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();

const jsonParser = express.json();

authRouter.post("/register", jsonParser, validateBody(userSchemaValidation), register);
authRouter.post("/login", jsonParser, validateBody(userSchemaValidation), login);
authRouter.patch("/",jsonParser, authenticate, validateBody(userSchemaUpdateSubscription), updateUserSubscription);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, current);


export default authRouter;