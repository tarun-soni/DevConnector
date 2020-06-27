const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        console.log('res body>>>>', res.body());
        res.send('user route');
    });

module.exports = router;
