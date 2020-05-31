import React from "react";

const ContactItem = ({ contact }) => {
  const { name, email, id, phone, type } = contact;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {" "}
        {name}{" "}
        <span
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>{" "}
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}{" "}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
          <button className='btn btn-sm btn-dark'>Edit</button>
          <button className='btn btn-sm btn-danger'>Delete</button>
      </p>
    </div>
  );
};

export default ContactItem;
