const express = require('express');
const User = require('../models/User');
const nanoid = require("nanoid");

const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.generateToken();
    try {
        await user.save();
        res.send({username : user.username, id : user._id,token : user.token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({message: 'Password or username is wrong!'});
    }
    user.generateToken();
    await user.save();
    return res.send(user);
});

module.exports = router;