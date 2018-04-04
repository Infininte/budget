var express = require('express');
var router = express.Router();

PageSchema = require('../model/Page');
pageRepo = require("../repo/page");

router.get('/:pageName', (req, res) => {
    PageSchema.findOne({name: req.params.pageName}, function(err, obj){
        if(err) res.send("Could not find a page");
        res.send(obj)
    })
});

router.post('/:pageName/scrap', (req, res) => {
    pageRepo.addScrap(req.params.pageName, (err, obj) => {
        if(err) {
            res.status(404).send("Error: Could not find a scrap to update");
            return;
        }
        res.send(obj);
    })
});

module.exports = router;