import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactService
} from "../services/contactsServices.js";
import  HttpError  from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        if(!contacts) {
            throw HttpError(404, "Not found");
        };
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    };
};

export const getOneContact = async (req, res, next) => {
    try {
        const contact = await getContactById(req.params.id);
        if(!contact) {
            throw HttpError(404, "Not found"); 
        }
        res.status(200).json(contact);
      } catch(error) {
        next(error);
    };
};

export const deleteContact = async (req, res, next) => {
    try {
        const contact = await removeContact(req.params.id);
        if(!contact) {
            throw HttpError(404, "Not found");
        };
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    };
};

export const createContact = async (req, res) => {
    try {
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

export const updateContact = async (req, res, next) => {
    try {   
        if ((Object.keys(req.body).length === 0)) {
            throw HttpError(400, "Body must have at least one field" );
        };
        const contact = await getContactById(req.params.id);
        if(!contact) {  
            throw HttpError(404, "Not found");
        }; 
        const updatedContact = await updateContactService(req.params.id, req.body);
        res.status(200).json(updatedContact);
} catch (error) {
    next(error);
}
};
