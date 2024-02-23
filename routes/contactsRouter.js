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

const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/contacts", getAllContacts);

contactsRouter.get("/contacts/:id", isValidID, getOneContact);

contactsRouter.delete("/contacts/:id", isValidID,  deleteContact);

contactsRouter.post("/contacts", jsonParser, validateBody(createContactSchema), createContact);

contactsRouter.put("/contacts/:id", jsonParser, isValidID, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/contacts/:id/favorite", jsonParser, isValidID, validateBody(updateContactStatusSchema), updateStatusContact); 

export default contactsRouter;
