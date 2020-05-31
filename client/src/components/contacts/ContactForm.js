import React, { useState, useContext } from "react";
import ContactContext from '../../context/contact/ContactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) =>{
      e.preventDefault();
      contactContext.addContact(contact);
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      })
  }
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Contact</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <input
        type='submit'
        value='Add Contact'
        className='btn btn-primary btn-block'
      />
    </form>
  );
};

export default ContactForm;
