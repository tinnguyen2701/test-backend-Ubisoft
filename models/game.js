const mongoose = require('mongoose');
//
const { Schema } = mongoose;


const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    events: [
        {
            eventId: {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        }
    ],
    users: [
        {
            userID: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
