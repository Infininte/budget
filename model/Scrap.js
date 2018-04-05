const mongoose = require('mongoose');

var Schema = mongoose.Schema;

//TODO break these into seperate Schemas
ScrapSchema = new Schema({
    name: String,
    xLoc: Number,   //location on screen
    yLoc: Number,   //location on screen
    cells: [{
        y: Number,  //location in table
        x: Number,  //location in table
        value: Schema.Types.Mixed
    }]
});

module.exports = mongoose.model('Scrap', ScrapSchema);