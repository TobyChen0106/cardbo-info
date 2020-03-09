const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');
const Info = require('../models/Info');
const Offer = require('../models/offer');

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
                const newUser = {
                    userResponse: this.state.userId,
                    displayName: this.state.displayName,
                    nickName: this.state.nickName,
                    age: this.state.age,
                    gender: this.state.gender,
                    cards: userCards,
                    stores: []
                };
                userResponse = userdata;
                userResponse.save().then((user) => {
                    res.json("User Data modified!");
                })
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
            // else if (!userResponse) {
            //     res.json({ IDregistered: false });
            // } else {
            //     res.json({ IDregistered: true });
            // }
            else{
                res.json(userResponse);
            }
        })
    }
});

router.get('/cards', (req, res) => {
    Card.find({}, (err, data) => {
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

router.post('/card-id2name', (req, res) => {
    const cardID = req.body.cardID;
    Card.find({cardID:cardID}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] EMPTY DATA!");
        } else {
            res.json(data.cardName);
        }
    })
});

router.get('/all-infos', (req, res) => {
    Offer.find({}, (err, data) => {
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
    const offerID = req.params.id;
    console.log(offerID);
    Offer.findOne({ offerID: offerID }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
});

router.post('/saveinfos', (req, res) => {
    const infodata = req.body;
    console.log(infodata)
    Info.findOne({ infoID: infodata.infoID }, (err, infoResponse) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        if (infoResponse) {
            infoResponse.infoTitle = infodata.infoTitle;
            infoResponse.infoSummary = infodata.infoSummary;
            infoResponse.dueDate = infodata.dueDate;
            infoResponse.contents = infodata.contents;
            console.log(infoResponse);
            infoResponse.save().then((user) => {
                res.json("Data saved!");
            })
        } else {
            res.json("INFO ID ERROR!");
            console.log("INFO ID ERROR!");
        }
    })

});

module.exports = router;