import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) return null;

  const [delContact] = contacts.splice(contactIdx, 1);
  await updateContact(contacts);
  return delContact;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};
