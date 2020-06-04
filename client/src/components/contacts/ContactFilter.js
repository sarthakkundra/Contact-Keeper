import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';


const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filtered, clearFilter, filterContacts} = contactContext;

    useEffect(() =>{
        if(filtered === null){
            text.current = '';
        }
    })

    const onChange = e =>{
        if(text.current.value !== ''){
            filterContacts(e.target.value)
        } else{
            clearFilter();
        }
    }
    return (
        <form>
            <input type={text} type="text" onChange={onChange}/>
        </form>
    )
}

export default ContactFilter
