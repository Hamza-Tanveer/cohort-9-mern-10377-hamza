const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\S]+@[\S]+\.[\S]+$/, //very basic check for testing only
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        //removing for local testing
        // match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}/, 
        select: false,
    },
},
    {
        timestamps: true,
    }
);

// create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;