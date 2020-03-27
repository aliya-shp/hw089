const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;