PageSchema = require('../model/Page');
ScrapSchema = require('../model/Scrap');

let repo = {};

repo.addScrap = (pageName, callback) => {
    try {
        PageSchema.findOne({name: pageName}, function(err, page){
            if(err) {
                console.log(err);
            }
            
            var defaultName = 'Scrap';
            for(var i = 0; i < 1000; i++){
                var newName = defaultName + ' ' + i;
                if(!page.scraps.includes(newName)){

                    var newScrap = new ScrapSchema();
                    newScrap.name = newName;
                    newScrap.save((err) => { 
                        if(err) callback(err) }
                    );

                    page.scraps.push(newName);
                    page.save(callback);
                    break;
                }
            }
        })
    } catch(error){
        console.log(error);
    }
}

module.exports = repo;