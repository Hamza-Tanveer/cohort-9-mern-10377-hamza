const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    lastName: {
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
        match: /^[A-Za-z][\w.\-]{0,59}@[A-Za-z]+\.[A-Za-z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}/,
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