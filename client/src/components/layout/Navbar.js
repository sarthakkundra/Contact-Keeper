import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

export const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, user, logout } = authContext;
  const { clearContacts, loading } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  }
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        {" "}
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>{" "}
        </a>
      </li>
    </Fragment>
  );


  const guestLinks = (
    <Fragment>
       <li>
          <Link to='/login'> Login </Link>
        </li>

        <li>
          <Link to='/register'> Register </Link>
        </li>
    </Fragment>
  )
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> Contact Keeper
      </h1>
      <ul>
        { isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
