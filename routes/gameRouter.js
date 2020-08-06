const express = require('express');
const {ObjectID} = require('mongodb');
//
const Game = require('../models/game');
const Event = require('../models/event');
const logger = require('../utils/logger');

const router = express.Router();

// get information game and events coming and going
router.get('/information/:gameID', async (req, res) => {
    try {
        const {gameID} = req.params;
        const now = new Date();

        await Game.findOne({_id: gameID}).then(async game => {
            let events = [];
            await Event.find({gameID}).then(documents => {
                events = documents && documents.length > 0
                    && documents.filter(_ => _.finishingTime.getTime() > now.getTime());

                res.send({document: {game, events}});
            })
        })
    } catch (e) {
        res.sendStatus(500);
    }
});

// create game
router.post('/', async (req, res) => {
    try {
        const {title} = req.body;
        const code = ObjectID().toString();

        const newGame = new Game({
            title,
            code
        });

        await newGame.save();
        res.send({document: newGame});
    } catch (e) {
        logger.logError(e);
        res.sendStatus(500);
    }
});

module.exports = router;
