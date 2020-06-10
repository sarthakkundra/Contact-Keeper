import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] =useReducer(ContactReducer, initialState);

  const addContact = async (contact) =>{
      const config = { 
        header : {
          'Content-Type' : 'application/json'
        }
      }

      try {
        const res = await axios.post('/api/contacts', contact, config)
        console.log(res.data)
        dispatch({ type: ADD_CONTACT, payload: res.data})

      } catch (e) {
        console.log(e.response.msg)
        dispatch({ type: CONTACT_ERROR, payload: e.response.msg})
      }
    
  }

  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact});
  }

  const deleteContact = (id) =>{

    dispatch({ type: DELETE_CONTACT, payload: id});
  }

  const setCurrent = current =>{

    dispatch({ type: SET_CURRENT, payload: current});
  }

  const clearCurrent = () =>{
    dispatch({type: CLEAR_CURRENT})
  }

  const filterContacts = (text) =>{

    dispatch({type: FILTER_CONTACTS, payload: text})
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER})
  }


  return(
      <ContactContext.Provider
      value={{
          contacts: state.contacts,
          current: state.current,
          filtered: state.filtered,
          addContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          filterContacts,
          clearFilter
      }}>
          {props.children}
      </ContactContext.Provider>
  )
};

export default ContactState;
