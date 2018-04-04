const mongoose = require('mongoose');

var Schema = mongoose.Schema;

ItemSchema = new Schema({
    index: Number,
    amount: Number,
    name: String,
    tags:  [{
        type: String
    }]
});


module.exports = mongoose.model('Item', ItemSchema);