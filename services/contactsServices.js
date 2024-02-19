import { promises as fs } from 'fs';
import { nanoid } from 'nanoid'; 
import path from 'path';

const CONTACTS_PATH = path.resolve('db', 'contacts.json');

 export async function listContacts() {
  const data = await fs.readFile(CONTACTS_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find(i => i.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const data = await listContacts();
  const contact = data.find(i => i.id === contactId);
  if (!contact) {
    return null; 
  };
  const newData = data.filter(i => i.id !== contactId); 
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(newData));
  return contact;
};

export async function addContact(contact) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    ...contact
  };
  data.push(newContact);
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(data));
  return newContact;
}

export async function updateContactService(contactId, contact) {
  const data = await listContacts();
  const index = data.findIndex(i => i.id === contactId);
    if (index === -1) {
        return null;
  }
  const updatedContact = { ...data[index], ...contact };
  data[index] = updatedContact;
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(data));
  return updatedContact;
}

