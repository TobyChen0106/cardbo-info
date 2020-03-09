const mongoose = require('mongoose')
const ExpirationSchema = require('./components/expiration')
const Schema = mongoose.Schema

const RewardSchema = new Schema({
    form:{
        type: String,
    },
    contents: {
        type: String,
        default: "",
        // required: true
    },
    limits: {
        type: [String],
        default: "Unlimited"
    },
    timingToOffer: {
        type: String
    },
    places: {
        type: [String]
    },
    notes: {
        type: String
    }
})
const ConstraintSchema = new Schema({
    userIdentity: {
        type: String
    },
    timingOfConsumption: {
        type: String
    },
    channels: {
        type: [String]
    },
    amounts: {
        type: [String]
    },
    numberOfConsumption: {
        type: Number
    },
    type: {
        type: String
    },    
    others: {
        type: [String]
    }
})

const OfferSchema = new Schema({
    offerID: {
        type: String,
        required: true,
        unique: true
    },
    offerName: {
        type: String,
        // required: true
    },
    cardID: {
        type: String,
        required: true
    },
    expiration: {
        type: ExpirationSchema,
        required: true
    },
    offerAbstract: {
        type: String,
        default: "NAN",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type:[String]
    },
    numSearch:{
        type: Number,
        default: 0
    },
    reward: {
        type: RewardSchema,
        // required: true
    },
    constraint: {
        type: ConstraintSchema
    }
})

const Offer = mongoose.model('offer', OfferSchema);
module.exports = Offer;