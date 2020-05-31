import React, { useReducer } from "react";
import {v4 as uuidv4 } from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "test1",
        email: "test1@example.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "test2",
        email: "test2@example.com",
        phone: "222-222-22222",
        type: "professional",
      },
      {
        id: 3,
        name: "test3",
        email: "test3@example.com",
        phone: "333-333-3333",
        type: "personal",
      },
    ],
  };

  const [state, dispatch] =useReducer(ContactReducer, initialState);

  const addContact = (contact) =>{
      contact.id = uuidv4();
      dispatch({ type: ADD_CONTACT, payload: contact})
  }


  return(
      <ContactContext.Provider
      value={{
          contacts: state.contacts,
          addContact,
      }}>
          {props.children}
      </ContactContext.Provider>
  )
};

export default ContactState;
