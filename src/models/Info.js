const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InfoSchema = new Schema({
    infoID: {
        type: String,
        required: true
    },
    cardID: {
        type: String,
        required: true
    },
    infoTitle: {
        type: String,
        required: true
    },
    infoSummary: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    }
});

const Info = mongoose.model('info', InfoSchema);
module.exports = Info;