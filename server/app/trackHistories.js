const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/',auth, async (req,res) => {
    const issueDate = new Date().toISOString();
    const trackHistory = new TrackHistory({
        issueDate,
        track: req.body.track,
        user: req.user._id,
    });
    try {
        await trackHistory.save();
        res.send(trackHistory);
    } catch (error) {
        res.send(error);
    }
});

router.get('/',auth, async (req,res) => {
    const trackHistories = await TrackHistory.find({user: req.user._id}).sort({issueDate: -1}).populate({path: 'track', populate: {path: 'album', populate: {path: 'artist'}}});
    res.send(trackHistories);
});

module.exports = router;