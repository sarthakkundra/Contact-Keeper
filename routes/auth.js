const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/default.json');
const { check, validationResult } = require("express-validator");
const auth = require('../middleware/auth');
const User = require("../models/User");
const router = express.Router();

const secret = config.jwtSecret;

// Get logged in user
router.get("/", auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (e) {
        console.error(e.message);
        res.status(500);
    }

});

// Authenticating a user
router.post(
  "/",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
    
        const isMatch = bcrypt.compare(password, user.password);
    
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
    
        const payload = {
            user: {
                id: user.id
            }
        }
    
        jwt.sign(payload, secret, {expiresIn: 360000}, (err, token) =>{
    
            if(err) throw err;
            res.json({ token });
        } )
    } catch(e){
        console.error(e.message);
        res.status(500).send(e);
    }

  }
);

module.exports = router;
