const express = require('express');
const Note = require('../models/Note');
const Auth = require('../middleware/auth');
const logger = require('../logger');

const router = express.Router();

router.use(Auth);

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({user: req.userId}).sort({updatedAt: -1});
        res.status(200).json(notes);
    }
    catch (err) {
        logger.error({err}, 'Could not load notes');
        res.status(500).json({error: 'Could not load notes'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id, user: req.userId});

        if (!note) {
            return res.status(404).json({error: 'Note not found'});
        }

        res.status(204).send();
    }
    catch (err) {
        logger.error({err, noteId: req.params.id}, 'Could not delete note');
        res.status(400).json({error: 'Could not delete note'});
    }
});

module.exports = router;