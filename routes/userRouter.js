const express = require('express');
const {ObjectID} = require('mongodb');
//
const User = require('../models/user');
const Game = require('../models/game');
const logger = require('../utils/logger');

const router = express.Router();

// get information of user follow a detail game
router.get('/information/:userID/game/:gameID', async (req, res) => {
    try {
        const {userID, gameID} = req.params;
        await Game.findOne({_id: gameID}).then(async game => {
            if(game && game.users && game.users.find(_ => _.userID.equals(userID))) {
                await User.findOne({_id: userID}).then((user) => {
                    const gameOfUser = user.games.find(_ => _.gameID.equals(gameID));
                    let coins = 0;
                    let stars = 0;

                    if(gameOfUser) {
                        coins = gameOfUser.coins;
                        stars = gameOfUser.stars
                    }

                    res.send({document: {fullName: user.fullName, playerID: user.playerID, coins, stars}});
                })
            } else {
                res.sendStatus(404);
            }
        })
    } catch (e) {
        res.sendStatus(500);
    }
});

// update user
router.patch('/information/:userID/game/:gameID', async (req, res) => {
    try {
        const {userID, gameID} = req.params;
        const {fullName} = req.body;

        await Game.findOne({_id: gameID}).then(async game => {
            if(game && game.users && game.users.find(_ => _.userID.equals(userID))) {
                await User.updateOne({_id: userID}, {$set: {fullName}}).then(rs => {
                    res.send({document: {fullName: fullName}});
                })
            } else {
                res.sendStatus(404);
            }
        })
    } catch (e) {
        res.sendStatus(500);
    }
});

// create user
router.post('/', async (req, res) => {
    try {
        const {fullName, gameID} = req.body;
        const playerID = ObjectID().toString();

        let games = gameID ? [{
            gameID,
            coins: 100,
            stars: 1
        }] : [];

        const newUser = new User({
            fullName,
            playerID,
            recentLoginTime: new Date(),
            games
        });

        // save user
        await newUser.save().then(async () => {
            // add user to game
            if (gameID) {
                await Game.findOneAndUpdate({_id: gameID}, {$push: {users: {userID: newUser.id}}});
            }
        });

        res.send({document: newUser});
    } catch (e) {
        logger.logError(e);
        res.sendStatus(500);
    }
});

module.exports = router;
