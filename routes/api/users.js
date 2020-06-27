const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//@route       POST api/users
//@desc        test route
//@access      public
const nameErrorMsg = " Name is Required'"
const emailErrorMsg = " Please input a valid email address"
const passwordErrorMsg = "Please enter a pass with 6 or more characters"

router.post('/', [
    check('name', nameErrorMsg).not().isEmpty(),
    check('email', emailErrorMsg).isEmail(),
    check('password', passwordErrorMsg).isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const { name, email, password } = req.body// destructoring req.body 
            //TODO: see if users already exists
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] })
            }

            //TODO: get users gravatar
            const avatar =
                gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

            // initalize the user
            user = new User({
                name, email, avatar, password
            })

            //TODO: hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt); // override the inited plaintext pass wid hash

            await user.save(); // save the initialized user

            // TODO: return jwt

            res.send('user registered');
        } catch (err) {
            console.error('error in users POST ', err);
            res.status(500).send('Server error');
        }
    });

module.exports = router;
