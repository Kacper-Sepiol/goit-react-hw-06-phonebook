import { configureStore, createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './actions';

const appState = {
  contacts: [],
  filter: '',
};

const contactsReducer = createReducer(appState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.contacts.push(action.payload);
    })
    .addCase(deleteContact, (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.split(index, 1);
    });
});

export const store = configureStore({
  reducer: contactsReducer,
});
