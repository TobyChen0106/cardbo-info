const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpirationSchema = new Schema({
    beginDate: {
        type: String,
        default: "From now on",
        required: true
    },
    endDate: {
        type: String,
        default: "End of the year",
        required: true
    }
})

// const Expiration = mongoose.model('Expiration', ExpirationSchema);
module.exports = ExpirationSchema;