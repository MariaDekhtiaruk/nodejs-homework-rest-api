const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

// до JSON.stringify додати null, 2 , щоб розділиити записи в json, без цього вони в одну строку
const updateContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// так як є SON.parse, то можна не вказувати 'utf-8' в fs.readFile(contactsPath, 'utf-8'), і так буде без буффера
async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  // Щоб yargs сприймав числове id як строку, потрібно прописати String(id)
  const jsonId = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === jsonId);
  return result || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  // потрібно перезаписати весь файл, щоб коректно додати новий контакт

  await updateContacts(contacts);
  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const jsonId = String(contactId);
  const index = contacts.findIndex((item) => item.id === jsonId);
  if (index === -1) return null;
  contacts[index] = { contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const jsonId = String(contactId);
  const index = contacts.findIndex((item) => item.id === jsonId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
