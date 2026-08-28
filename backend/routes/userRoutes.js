const express = require("express");
const router = express.Router();
const User = require('./../models/User');
const logger = require('./../logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../middleware/auth');

const cookieOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
};

//user signup endpoint
router.post('/signup', async(req, res) => {
    try{
        const {name, email, password} = req.body; 

        //hash the user password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        logger.info('Signup successful');
        res.status(201).json({message: 'Signup successful', userInfo: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }});

    }
    catch(err){
        logger.error({err}, 'Could not register new user');
        return res.status(400).json({message: 'Could not register new user'});
    }
});

//user login
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

    if(!user){
        logger.error('User not found');
        return res.status(401).json({error: 'Invalid credentials'});
    }
 
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        logger.error('Password is not valid');
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const payLoad = {
        userID: user._id,
    }

    //create token
    const token = jwt.sign(payLoad, process.env.JWT_Secret, {expiresIn: '1h'});

    logger.info('User logged in');
    res.cookie('session', token, cookieOptions);
    res.status(200).json({message: 'logged in'});
    }
    catch(err){
        logger.error({err}, 'Login failed');
        res.status(400).json({error: 'Login failed'});
    }
})

router.get('/me', Auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('name email');

        if (!user) {
            return res.status(401).json({error: 'Authentication required'});
        }

        res.status(200).json({user});
    }
    catch (err) {
        logger.error({err, userId: req.userId}, 'Could not verify session');
        res.status(500).json({error: 'Could not verify session'});
    }
});

//user logout
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('session', cookieOptions);
        res.status(200).json({message: 'logged out'});
    }
    catch (err) {
        logger.error({err}, 'Logout failed');
        res.status(500).json({error: 'Logout failed'});
    }
});

module.exports = router;