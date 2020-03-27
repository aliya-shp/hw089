const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    sequence: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;