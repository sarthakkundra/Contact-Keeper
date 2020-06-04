import React from "react";
import Contact from '../contacts/Contact';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

export const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
      <Contact />
      </div>

    </div>
  );
};

export default Home;
