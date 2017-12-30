const mongoose = require('mongoose');

var Schema = mongoose.Schema;

//TODO break these into seperate Schemas
PageSchema = new Schema({
    name: String,
    scraps: [{
            name: String,
            x_loc: Number,
            y_loc: Number,
            items: [{
                    name: String,
                    amount: Number,
                    index: Number,
                    tags: [{
                        type: String
                    }]

                }]
        }]
});


module.exports = mongoose.model('Page', PageSchema);