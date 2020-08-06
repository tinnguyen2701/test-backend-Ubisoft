const mongoose = require('mongoose');
//
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    playerID: {
        type: String,
        required: true,
        unique: true
    },
    recentLoginTime: {
        type: Date,
        required: true,
    },
    games: [
        {
            gameID: {
                type: Schema.Types.ObjectId,
                ref: 'Game'
            },
            coins: {
                type: Number,
            },
            stars: {
                type: Number,
            }
        }
    ]
})

const User = mongoose.model('User', userSchema);
module.exports = User;
