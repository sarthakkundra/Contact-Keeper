import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/ContactContext";

const Contact = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  return (
    <Fragment>
      <TransitionGroup>
      {filtered !== null
        ? filtered.map((contact) => (
          <CSSTransition  key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
            </CSSTransition>
          ))
        : contacts.map((contact) => (
          <CSSTransition  key={contact.id} timeout={500} classNames='item'>
            <ContactItem key={contact.id} contact={contact} />
            </CSSTransition>
          ))}
          </TransitionGroup>
    </Fragment>
  );
};

export default Contact;
