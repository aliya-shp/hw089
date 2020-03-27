const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const auth = require('../middlewares/middleware');
const permit = require('../middlewares/permit');


const config = require('../config');

const Artist = require('../models/Artist');

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
    const items = await Artist.find();
    return  res.send(items);
});


router.post('/', [auth, permit('user', 'admin'),upload.single('image'),], async (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }

    try {
        const artist = new Artist(artistData);
        await artist.save();

        return res.send({id: artist._id});
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
        return res.sendStatus(404);
    }

    artist.published = true;

    await artist.save();

    res.send(artist);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        await artist.remove();
        return res.send({message: 'Successfully removed'})
    } catch(error) {
        res.status(400).send({error});
    }
});

module.exports = router;