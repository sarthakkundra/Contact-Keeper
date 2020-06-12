import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/ContactContext";

const Contact = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, [])
  return (
    <Fragment>
      <TransitionGroup>
      {filtered !== null
        ? filtered.map((contact) => (
          <CSSTransition  key={contact._id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
            </CSSTransition>
          ))
        : contacts.map((contact) => (
          <CSSTransition  key={contact._id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
            </CSSTransition>
          ))}
          </TransitionGroup>
    </Fragment>
  );
};

export default Contact;
