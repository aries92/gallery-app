const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureModel = new Schema({
    title: String,
    name: {type: String, required: true},
    url: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Picture', pictureModel);