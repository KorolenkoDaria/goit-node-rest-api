import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactService
} from "../services/contactsServices.js";
import  HttpError  from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await listContacts();
        if(!contacts) {
            throw HttpError(404, "Not found");
        };
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

export const getOneContact = async (req, res) => {
    try {
        const contact = await getContactById(req.params.id);
        if(!contact) {
            throw HttpError(404, "Not found"); 
        }
        res.status(200).json(contact);
      } catch(error) {
        res.status(500).json({ error: error.message });
    };
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await removeContact(req.params.id);
        if(!contact) {
            throw HttpError(404, "Not found");
        };
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

export const updateContact = async (req, res) => {
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
    res.status(500).json({ error: error.message });
}

};