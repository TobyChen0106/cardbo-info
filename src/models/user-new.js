const mongoose = require('mongoose')
const Schema = mongoose.Schema


const setMongoMixedWithBadKeys = data =>
    Array.isArray(data)
        ? data.map(setMongoMixedWithBadKeys)
        : typeof data === 'object'
            ? Object.entries(data).reduce((a, [key, value]) => ({ ...a, [key.replace('.', '__').replace('$', '___')]: setMongoMixedWithBadKeys(value) }), {})
            : data

const getMongoMixedWithBadKeys = data =>
    Array.isArray(data)
        ? data.map(getMongoMixedWithBadKeys)
        : typeof data === 'object'
            ? Object.entries(data).reduce((a, [key, value]) => ({ ...a, [key.replace('__', '.').replace('___', '$')]: getMongoMixedWithBadKeys(value) }), {})
            : data

const UserSchema = new Schema({
    lineID: {
        type: String,
        // required: true
    },
    displayName: {
        type: String,
        // required: true
    },
    nickName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    cards:{
        // cardID, e.g., ts0001
        type: [String],
        default: undefined,
    },
    favoriteStores:{
        type: [String],
        default: undefined,
    }
});

const User = mongoose.model('User', UserSchema, "users");
module.exports = User;