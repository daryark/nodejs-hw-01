const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const contact = contacts.find((item) => contactId === item.id);
	return contact;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === contactId);
	if (!idx) return null;

	const removeContact = contacts.splice(idx, 1); //splice removes the item and returns the item that was removed;
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return removeContact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = { id: v4(), name, email, phone };
	const addedContacts = [...contacts, newContact];
	await fs.writeFile(contactsPath, JSON.stringify(addedContacts));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};
