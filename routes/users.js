const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("../config/default.json");
const User = require("../models/User");
const router = express.Router();

const secret = config.jwtSecret;
// Register a user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Password should be at least 6 characters long"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const duplicate = await User.findOne({ email });

      if (duplicate) {
        res.status(400).json({msg: "User already exists, try logging in"});
      }

      var user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
          payload,
          secret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    //   res.status(200).send("User saved");
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: 'Reigstration failed'});
    }
  }
);

module.exports = router;
