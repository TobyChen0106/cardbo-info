const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');
const Info = require('../models/Info');

router.post('/users', (req, res) => {
    const userdata = req.body;
    if (userdata.lineID === "") {
        res.json("[ERROR] lineID empty!");
    } else {
        User.findOne({ lineID: userdata.lineID }, (err, userResponse) => {
            if (err) {
                console.log(err);
                res.json("Server User find ID Error." + String(err));
            }
            else if (!userResponse) {
                const newUser = new User(userdata);
                newUser.save().then((user) => {
                    res.json("New user created!");
                })
            } else {
                res.json("This lineID have been registered!");
            }
        })
    }
});

router.get('/users', (req, res) => {
    console.log('router get');
    res.json();
});

router.post('/check-users', (req, res) => {
    const userID = req.body.userID;
    if (userID === "") {
        res.json("[ERROR] lineID ERROR!");
    } else {
        User.findOne({ lineID: userID }, (err, userResponse) => {
            if (err) {
                console.log(err);
                res.json("Server User find ID Error." + String(err));
            }
            else if (!userResponse) {
                res.json({ IDregistered: false });
            } else {
                res.json({ IDregistered: true });
            }
        })
    }
});

router.get('/cards', (req, res) => {
    Card.find({  }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] EMPTY DATA!");
        } else {
            res.json(data);
        }
    })
});

router.get('/all-infos', (req, res) => {
    Info.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] EMPTY DATA!");
        } else {
            res.json(data);
        }
    })
});

router.get('/infos/:id', (req, res) => {
    const infoID = req.params.id;
    console.log(infoID);
    Info.findOne({'infoID':infoID}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
});

module.exports = router;