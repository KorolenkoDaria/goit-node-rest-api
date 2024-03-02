import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact, 
  updateStatusContact 
} from "../controllers/contactsControllers.js"; 
import validateBody from "../helpers/validateBody.js";
import { isValidID } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema, updateContactStatusSchema } from "../schemas/contactsSchemas.js";
import { authenticate} from "../middlewares/authenticate.js"

const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/contacts",authenticate, getAllContacts);

contactsRouter.get("/contacts/:id",authenticate, isValidID, getOneContact);

contactsRouter.delete("/contacts/:id", authenticate, isValidID,  deleteContact);

contactsRouter.post("/contacts", jsonParser, authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put("/contacts/:id", jsonParser, authenticate,  isValidID, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/contacts/:id/favorite", jsonParser, authenticate, isValidID, validateBody(updateContactStatusSchema), updateStatusContact); 



export default contactsRouter;
