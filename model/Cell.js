const mongoose = require('mongoose');

var Schema = mongoose.Schema;

CellSchema = new Schema({
    y: Number,
    x: Number,
    value: Schema.Types.Mixed
});


module.exports = mongoose.model('Cell', CellSchema);