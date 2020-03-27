const express = require('express');
const Album = require('../models/Album');
const Track = require('../models/Track');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.album){
        const tracksByAlbum = await Track.find({album : req.query.album}).sort({sequence : 1});
        return res.send(tracksByAlbum);
    }

    if (req.query.artist){
        try {
            const albums = await Album.find({artist : req.query.artist}).select('_id');
            const albumsById = albums.map(album => album._id);
            const tracks = await Track.find({album : {$in : albumsById}});
            return res.send(tracks);
        } catch (error) {
            return res.status(400).send(error);
        }

    }
    const tracks = await Track.find();
    return res.send(tracks);
});

router.post('/',[auth, permit('user', 'admin')], async (req, res) => {
    try {
        const trackData = {
            title: req.body.title,
            album: req.body.album,
            sequence: req.body.sequence,
            duration: req.body.duration
        };
        const track = new Track(trackData);
        await track.save();
        return res.send(track);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
    const track = await Track.findById(req.params.id);

    if (!track) {
        return res.status(404).send({message: 'Oops'});
    }

    track.published = true;

    await track.save();

    res.send(track);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        await track.remove();
        res.send({message:'Successfully removed'});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;