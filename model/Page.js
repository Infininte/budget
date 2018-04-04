const mongoose = require('mongoose');
const Scrap = require('./Scrap');

var Schema = mongoose.Schema;

//TODO break these into seperate Schemas
PageSchema = new Schema({
    name: String,
    scraps: [String]
});


module.exports = mongoose.model('Page', PageSchema);