const express = require('express');
const { check, validationResult } = require("express-validator");

const auth = require('../middleware/auth');

const Contact = require('../models/Contacts'); 
const User = require('../models/User'); 


const router = express.Router();



// Getting all contacts
router.get('/', auth, async (req, res) =>{
    
    try {
            const contacts = await Contact.find({ user: req.user.id }).sort({date: -1 });
            res.json(contacts);

    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error');
    }
})

// Creating a contact
router.post('/', [auth, [check('name', 'Name is required').exists()]], async (req, res) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const { name, email, phone, type } = req.body;

      try {
         
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
       const contact =  await newContact.save();
      } catch (e) {
          
        console.error(e.message);
        res.status(500).json({ msg: 'Internal Server Error'});
      }
})

// Updating a contact
router.put('/:id', auth, async (req, res) =>{
   
    try {

        const availableUpdates = ['name', 'email', 'type', 'phone'];
        const updates = Object.keys(req.body)
    
        const contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({ message: 'Contact not found'});
        }
    
        updates.forEach((update, i) =>{
    
            if(availableUpdates.includes(update)){
                 contact[update] = req.body[update];
            }
        })
    
        await contact.save();
    
        res.status(200).send(contact);

    } catch (e) {

        console.error(e.message);
        res.status(500).send('Internal Server Error');
    }

})

// Deleting a contact
router.delete('/:id', auth,  async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(contact){
        res.status(200).send('Contact removed');
    } else {
        res.status(404).json({message: 'contact does not exist'})
    }

})
module.exports = router;