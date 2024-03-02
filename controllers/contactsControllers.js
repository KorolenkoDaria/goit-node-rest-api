
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { id: owner } = req.user;
        const contacts = await Contact.find({owner});
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
        const contact = await Contact.findById(req.params.id);
        if(contact === null) {
            throw HttpError(404, "Not found"); 
        }
        res.status(200).json(contact);
      } catch(error) {
        next(error);
    };
};

export const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
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
        const { id: owner } = req.user;
        const newContact = await Contact.create({ ...req.body, owner });
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
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedContact) {  
            throw HttpError(404, "Not found");
        };
        res.status(200).json(updatedContact);
} catch (error) {
    next(error);
}
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const updatedContactStatus = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if(!updatedContactStatus) {
            throw HttpError(404, "Not found");
        };

        res.status(200).json(updatedContactStatus);
    } catch (error) {
        next(error)
    }
}
