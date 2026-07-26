const express = require("express");
const router = express.Router();
const User = require('./../models/User');
const logger = require('./../logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//user signup endpoint
router.post('/signup', async(req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body; 
        const newUser = new User({firstName, lastName, email, password});

        //hash the user password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;

        const response = await newUser.save();
        logger.info('Signup successful');
        res.status(201).json({message: 'Signup successful', userInfo: response});

    }
    catch(err){
        logger.error(err);
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
        return res.status(404).json({error: 'User not found'});
    }

    //compare password 
    const isValidPassword = bcrypt.compare(password, user.password);

    if(!isValidPassword){
        logger.error('Password is not valid');
        return res.status(400).json({error: 'Invalid Password'});
    }

    const payLoad = {
        userID: user._id,
    }

    //create token
    const token = jwt.sign(payLoad, process.env.JWT_Secret, {expiresIn: '1h'});

    logger.info('User logged in');
    res.status(200).json({message: 'logged in', token: token});
    }
    catch(err){
        logger.error(err, 'Some kind of error');
        res.status(400).json({error: 'Login failed'});
    }
})

module.exports = router;