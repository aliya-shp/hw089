const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const config = require('../config');

const Album = require('../models/Album');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.artist){
        const albumsOfArtist = await Album.find({artist : req.query.artist}).sort({issueDate : 1});
        return res.send(albumsOfArtist);
    }
    const albums = await Album.find();
    res.send(albums);
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');

        if (!album) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(album);
    } catch (error) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', [auth, permit('user','admin'),upload.single('image')], async (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }

    try {
        const album = new Album(albumData);
        await album.save();

        return res.send({id: album._id});
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
    const album = await Album.findById(req.params.id);

    if (!album) {
        return res.status(404).send({message: 'Oops'});
    }

    album.published = true;

    await album.save();

    res.send(album);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        await album.remove();
        res.send({message:'Successfully removed'});

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;