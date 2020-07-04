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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

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
        return res.json({ msg: 'Post Removed' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        console.error('error in route post POST ', err);
        res.status(500).send('Server error');
    }
});


//@route       PUT api/posts/like/:id
//@desc        Like a post
//@access      private
router.put('/like/:id', auth, async (req, res) => {
    try {
        //fetch the post
        const post = await Post.findById(req.params.id)

        //check if the post is already liked
        //explaintaion- from all the likes, if theres a like from the logged in user i.e req.user.id
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }

        //add a like 
        post.likes.unshift({ user: req.user.id })
        await post.save()

        return res.json(post.likes)

    } catch (err) {
        console.error('error in route /posts/like ', err);
        res.status(500).send('Server error');
    }
});


//@route       PUT api/posts/unlike/:id
//@desc        unlike a post
//@access      private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        //fetch the post
        const post = await Post.findById(req.params.id)

        //check if the post is already liked
        //desc- from all the likes, if theres a like from the logged in user i.e req.user.id
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post not yet been liked' })
        }

        //get remove index and splice (method 1)
        /* explaination- get index of the like by mapping through all the likes 
        and stop when it matches logged in user  i.e req.user.id */
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1)


        // method 2 (alternative method)
        // post.likes = post.likes.filter(
        //     ({ user }) => user.toString() !== req.user.id
        // );

        await post.save()
        return res.json(post.likes)

    } catch (err) {
        console.error('error in route /posts/like ', err);
        res.status(500).send('Server error');
    }
});


//@route       POST api/posts/comment/:id
//@desc        Add a comment on a post
//@access      private
router.post('/comment/:id',
    [auth, [
        check('text', 'Text is required').not().isEmpty()
    ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            }
            post.comments.unshift(newComment)
            await post.save()
            res.json(post.comments)
        } catch (err) {
            console.error('error in route posts/comment POST ', err);
            res.status(500).send('Server error');
        }
    }
);


//@route       DELETE api/posts/comment/:post_id/:comment_id
//@desc        Delete a comment on a post
//@access      private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post does not exist' });
        }
        // Pull out comment
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1)

        await post.save()
        res.json(post.comments)

    } catch (err) {
        console.error('error in route posts/comment Delete ', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;