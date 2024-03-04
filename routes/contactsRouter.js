import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { isValidID } from "../middlewares/isValidId.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from "../schemas/contactsSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidID, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidID, deleteContact);

contactsRouter.post(
  "/",
  jsonParser,
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  jsonParser,
  authenticate,
  isValidID,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  jsonParser,
  authenticate,
  isValidID,
  validateBody(updateContactStatusSchema),
  updateStatusContact
);

export default contactsRouter;
