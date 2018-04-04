var express = require('express');
var router = express.Router();

ScrapSchema = require('../model/Scrap');
ItemSchema = require('../model/Item');

scrapRepo = require('../repo/scrap');

//Get a scrap
router.get('/:scrapName', (req, res) => {
    ScrapSchema.findOne({name: req.params.scrapName}, function(err, obj){
      if(err) res.status(404).send("Error: Could not find a scrap to update");
      res.send(obj) 
  })
});

//Create a scrap
router.post('/:scrapName', (req, res) => {
    try {
        newScrap = new ScrapSchema(req.body);
        newScrap.save();
        res.send(newScrap);
    } catch(error){
        console.log(error);
        res.status(500).send("Coulnd't save scrap");
    }
})

//Update a scrap
router.put('/:scrapName', (req, res) => {
    scrapRepo.updateScrap(req.params.scrapName, req.body, (err, obj) => {
        if(err) res.status(404).send("Error: Could not find a scrap to update");
        res.send(obj);
    });
})

//Add an item
router.post('/:scrapName/item', (req, res) => {
    ScrapSchema.findOne({name: req.params.scrapName}, function(err, scrap){
        if (err) {
            res.status(404).send("Error: Could not find a scrap to update");
            return;
        }

        newItem = new ItemSchema(req.body);
        console.log(newItem);
        scrap.items.push(newItem);
        scrap.save();
        res.send(scrap);
    })
})

module.exports = router;