import React from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

const COPY_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('komponent został zamontowany');
    const contactsJSON = localStorage.getItem('contacts');
    const contact = JSON.parse(contactsJSON);

    if (contact) {
      setContacts(contact);
    }
  }, []);

  useEffect(() => {
    console.log('komponent został zaktualizowany');
    const contactsJSON = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsJSON);
  }, [contacts]);

  const handleChangeName = event => {
    setName(event.currentTarget.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const handleChangeFilterField = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();

    setFilter(filterValue);

    const filteredContacts = COPY_CONTACTS.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

    setContacts(filteredContacts);

    if (evt.currentTarget.value === '') {
      setContacts(COPY_CONTACTS);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;

    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert('nie');
      return;
    }

    const newContact = { id: nanoid(), name, number };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');

    form.reset();
  };

  const handleDeleteContact = id => {
    const updateContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updateContacts);
    const contactsJSON = JSON.stringify(updateContacts);
    localStorage.setItem('contacts', contactsJSON);
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <ContactForm
        name={name}
        number={number}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
        sName={setName}
      ></ContactForm>

      <h2>Contacts</h2>
      <Filter
        filter={filter}
        handleChangeFilterField={handleChangeFilterField}
      ></Filter>

      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
      ></ContactList>
    </div>
  );
};
