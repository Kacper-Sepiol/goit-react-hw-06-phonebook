import { createAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

export const addContact = createAction('contact/addContact', (name, number) => {
  return {
    payload: {
      id: nanoid(),
      name: name,
      number: number,
    },
  };
});

export const deleteContact = createAction(
  'contact/deleteContact',
  contactId => {
    return {
      payload: contactId,
    };
  }
);
