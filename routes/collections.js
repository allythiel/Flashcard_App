const { Flashcard, validate } = require('../models/collection');
const { User } = require('../models/collection');
const express = require('express');
const router = express.Router();

router.get('/:userId/cardDeck/', async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:userId/cardDeck/:flashcardId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user)
            return res.status(400).send(`The user with id: "${req.params.id}" does not exist.`);

        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


router.post('/:userId/cardDeck/:flashcardId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        if (!user) return res.status(400).send(`The user with id "${req.params.userID}" does not exist`);

        const flashcard = await Flashcard.findById(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The flashcard with the id "${req.params.productId}" does not exist`);

        user.CardDeck.push(flashcard);

        await user.save();
        return res.send(user.CardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        return res.status(200).send(flashcards);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);

        if(!flashcard)
            return res.status(400).send(`The flashcard with id: "${req.params.id}" does not exist.`);

        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if(error)
            return res.status(400).send(error);

        const flashcard = new Flashcard({
            term: req.body.term,
            description: req.body.description,
        });

        await flashcard.save();

        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

    const flashcard = await Flashcard.findByIdAndUpdate(
        req.params.id,
        {
            term: req.body.term,
            description: req.body.description,
        },
        { new: true }
    );

    if(!flashcard)
        return res.status(400).send(`The flashcard with id: "${req.params.id}" does not exist.`);

    await flashcard.save();

    return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);

        if (!flashcard)
        return res.status(400).send(`The flashcard with id: "${req.params.id}" does not exist.`);

        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Servor Error: ${ex}`);
    }
});



module.exports = router;