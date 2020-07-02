const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator');

//@route       GET api/profile/me
//@desc        get current users profile
//@access      private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user', ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({ msg: ' There is No Profile for this user' })
        }

        res.json(profile)
    } catch (err) {
        console.error('error in Profile route:  api/profile/me >>>>', err)
        res.status(500).json({ msg: 'Server Error' });
    }
}
);




// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/',
    [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            location,
            website,
            bio,
            skills,
            status,
            githubusername,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        console.log('profile skilss', profileFields.skills);


        //Build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (facebook) profileFields.social.facebook = facebook;


        //Create or update profile

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                console.log('profile UPDATED  >>>>>', profile)
                return res.json(profile);
            }
            //Create
            profile = new Profile(profileFields)
            await profile.save()
            return res.json(profile)
            console.log('profile CREATED>>>>>', profile)

        } catch (err) {
            console.error('error in profile POST route: api/profile >>>>>', err)
            res.status(500).send('Server Error');
        }
    }
);


//@route       GET api/profile/
//@desc        get all profiles
//@access      private

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error('error in profile GET route: profile/me >>>> ', err)
        res.status(500).send('Server Error');
    }
})


//@route       GET api/profile/user/:user_id
//@desc        get profile by user id
//@access      public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).send({ msg: 'Profile Not Found' })
        }

        res.json(profile);
    } catch (err) {

        if (err.kind == 'ObjectId') {
            return res.status(400).send({ msg: 'Profile Not Found' })

        }
        console.error('error in profile GET route: user/userid >>>>>', err)
        res.status(500).send('Server Error');
    }
})



//@route       DELETE api/profile/
//@desc        delete  profile, user ,posts
//@access      Private

router.delete('/', auth, async (req, res) => {
    try {
        //TODO: remove users posts

        //removes profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //removes user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' })

    } catch (err) {
        console.error('error in profile DELETE route: profile >>>> ', err)
        console.error('error in profile DELETE route: profile >>>> ', err.message)
        res.status(500).send('Server Error');
    }
})

//@route       PUT api/profile/experience
//@desc        Add profile experience
//@access      private

router.put('/experience', [auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From Date is required').not().isEmpty(),
    ]], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, location, from, to, current, description } = req.body;
        const newExp = { title, company, location, from, to, current, description }
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            profile.experience.unshift(newExp);
            await profile.save()

            res.json(profile)
        } catch (err) {
            console.error('error in profile PUT route: profile/experience >>>> ', err)
            console.error('Message of error : profile/experience >>>>', err.message)
            res.status(500).send('Server Error');
        }
    })


//@route       DELETE api/profile/experience/:exp_id
//@desc        deletes experience from profile
//@access      private


router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get index of exp you want to remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice('removeIndex', 1);
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error('ERROR in profile DELETE route: profile/experience >>>> ', err)
        console.error('Message of error>>>>', err.message)
        res.status(500).send('Server Error');
    }
})
module.exports = router;