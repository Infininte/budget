const mongoose = require('mongoose');
const Scrap = require('./Scrap');

var Schema = mongoose.Schema;

//TODO break these into seperate Schemas
PageSchema = new Schema({
    name: String,
    scraps: [{ type: Schema.Types.ObjectId, ref: 'Scrap' }]
});


module.exports = mongoose.model('Page', PageSchema);