const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');



//@route       GET api/auth
//@desc        test route
//@access      public
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error('error in auth route >>>>', err)
        res.status(500).json({ msg: 'Server Error' });
    }
}
);



//@route       POST api/users
//@desc        Authenticate user and get token
//@access      public
const emailErrorMsg = "Please input a valid email address"
const passwordErrorMsg = "Password is required"

router.post('/', [
    check('email', emailErrorMsg).isEmail(),
    check('password', passwordErrorMsg).exists()
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body// destructoring req.body 
        try {

            let user = await User.findOne({ email });  //request to db find the user

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentails' }] })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentails' }] })

            }
            // TODO: return jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            // payload,algo,secret,callback
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            );

        } catch (err) {
            console.error('error in users POST ', err);
            res.status(500).send('Server error');
        }
    });


module.exports = router;