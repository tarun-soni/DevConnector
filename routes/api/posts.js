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
        check('text', 'Text is required').not().isEmpty()
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
    }
);


//@route       GET api/posts
//@desc        get all post
//@access      private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        console.error('error in route post POST ', err);
        res.status(500).send('Server error');
    }
});


//@route       GET api/posts/:id
//@desc        get post by id
//@access      private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.json(post)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        console.error('error in route post POST ', err);
        res.status(500).send('Server error');
    }
});



//@route       DELETE api/posts/:id
//@desc        Delete post by id
//@access      private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        //Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove()
        res.json({ msg: 'Post Removed' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        console.error('error in route post POST ', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;