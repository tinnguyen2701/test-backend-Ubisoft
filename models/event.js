const mongoose = require('mongoose');
//
const { Schema } = mongoose;

const eventSchema = new Schema({
    gameID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    finishingTime: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    rewards: {
        type: Number,
        required: true,
    },
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
