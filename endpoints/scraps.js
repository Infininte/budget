var express = require('express');
var router = express.Router();

ScrapSchema = require('../model/Scrap');
CellSchema = require('../model/Cell');

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
    console.log("Trying to update scrap " + req.params.scrapName + "with body: ");
    console.log(req.body);
    scrapRepo.updateScrap(req.params.scrapName, req.body, (err, obj) => {
        if(err) res.status(404).send("Error: Could not find a scrap to update");
        res.send(obj);
    });
})

//Add a cell
router.post('/:scrapName/cell', (req, res) => {
    ScrapSchema.findOne({name: req.params.scrapName}, function(err, scrap){
        if (err) {
            res.status(404).send("Error: Could not find a scrap to update");
            return;
        }

        newCell = new CellSchema(req.body);
        console.log(newCell);
        scrap.items.push(newCell);
        scrap.save();
        res.send(scrap);
    })
})

module.exports = router;