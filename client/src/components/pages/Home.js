import React from "react";
import Contact from '../contacts/Contact';
import ContactForm from '../contacts/ContactForm';

export const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
      <Contact />
      </div>

    </div>
  );
};

export default Home;
