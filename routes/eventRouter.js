const express = require('express');
//
const Event = require('../models/event');
const Game = require('../models/game');
const User = require('../models/user');
const logger = require('../utils/logger');

const router = express.Router();


// get rewards when event completed
router.get('/complete/:gameID', async (req, res) => {
    try {
        const {gameID} = req.params;

        await Game.findOne({_id: gameID}).then((game) => {
            if (game && game.users && game.users.length > 0) {
                Promise.all(
                    game.users.map(async item => {
                        const user = await User.findOne({_id: item.userID});
                        const gameOfUser = user.games.find(_ => _.gameID.equals(gameID));

                        return {
                            fullName: user.fullName,
                            coins: gameOfUser ? gameOfUser.coins : 0,
                            stars: gameOfUser ? gameOfUser.stars : 0
                        };
                    }),
                ).then(documents => res.send({documents}));
            } else {
                res.send({documents: []})
            }
        })
    } catch (e) {
        res.sendStatus(500);
    }
});

// create event
router.post('/', async (req, res) => {
    try {
        const {startTime, finishingTime, title, rewards, gameID} = req.body;

        const newEvent = new Event({
            gameID,
            startTime,
            finishingTime,
            title,
            rewards
        });

        await newEvent.save();
        res.send({document: newEvent});
    } catch (e) {
        logger.logError(e);
        res.sendStatus(500);
    }
});

module.exports = router;
