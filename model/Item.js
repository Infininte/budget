const mongoose = require('mongoose');

var Schema = mongoose.Schema;

ItemSchema = new Schema({
    amount: Number,
    name: String,
    tags:  [{
        type: String
    }]
});


module.exports = mongoose.model('Item', ItemSchema);