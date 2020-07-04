const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

// import models
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')


//@route       POST api/posts
//@desc        Create a post
//@access      private
router.post('/',
    [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
    ], async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            })
            const post = await newPost.save()
            res.json(post)
        } catch (err) {
            console.error('error in route post POST ', err);
            res.status(500).send('Server error');
        }
    });


module.exports = router;