ScrapSchema = require('../model/Scrap');

let repo = {};

repo.updateScrap = (scrapName, item, callback) => {
    console.log(item);
    try {
        ScrapSchema.findOneAndUpdate({name: scrapName}, item, {new: true, upsert: true}, function(err, scrap){
            if(err) {
                console.log(err);
            }
            callback(err, scrap);
        })
    } catch(error){
        console.log(error);
    }
}

module.exports = repo;