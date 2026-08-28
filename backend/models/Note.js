const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    content: {
        type: String,
        required: true,
    },
    isPinned: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;