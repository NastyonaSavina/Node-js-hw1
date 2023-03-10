
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const contactsPath = path.join(__dirname, '/db/contacts.json');


const getListContacts = async () => {

    try {
        const listResult = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(listResult); 
    }
    catch (error) {
        console.log(`Something went wrong.. ${error.message}`);

    }
    
}


const getContactById = async (contactId) => {

    try {
        const contacts = await getListContacts();
        const contactById = contacts.find((contact) => contact.id === contactId);
        if (!contactId) {
            return null;
        }
    return contactById;
    }
     catch (error) {
        console.log(`Something went wrong.. ${error.message}`);

    }
   
}

const removeContact = async (contactId) => {

    try {
        const contacts = await getListContacts();
     
        const updatedListContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedListContacts));
        return updatedListContacts;
    }
    catch (error) {
        console.log(`Something went wrong.. ${error.message}`);

    }

}






const addContact = async (name, email, phone) => {
    
    try {
        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone,
        };
        const contacts = await getListContacts();
        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts));


        return newContact;
    }
    catch (error) {
        console.log(`Something went wrong.. ${error.message}`);
    }
  
}

module.exports = {
    getListContacts,
    getContactById,
    removeContact,
    addContact,
  
};