const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

PageSchema = require('./model/Page');
ScrapSchema = require('./model/Scrap');
const fileProcessor = require('./processor');

/**
 * Mongoose config
 */
mongoose.connect('mongodb://localhost/budget');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected!");
});

// var scrap = new ScrapSchema({
//     name: "Food",
//     x_loc: 50,
//     y_loc: 50,
//     items: [{
//         name: "Wine",
//         amount: "525",
//         index: 0,
//         tags: []
//     }, {
//         name: "Groceries",
//         amount: "73",
//         index: 1,
//         tags: []
//     }]
// })
// scrap.save((err, scrap) => {
//     if(err) return console.error(err);
//     console.log("Save schema!: " + scrap);
// })

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/rest/page/*', (req, res) => {
  PageSchema.findOne({}, function(err, obj){
      if(err) res.send("Could not find a page");
      res.send(obj)
  })
});

app.get('/rest/scrap/:scrapName', (req, res) => {
    ScrapSchema.findOne({name: req.params.scrapName}, function(err, obj){
      if(err) res.send("Could not find a page");
      res.send(obj)
  })
});

app.post('/rest/page/*', (req, res) => {
    let page = req.body;
    PageSchema.findOne({name: page.name}, function(err, obj){
        if(err || !obj){
            newPage = new PageSchema(page);
            newPage.save();
            return;
        }
        Object.assign(obj, page)
        obj.save();
    })
    res.sendStatus(200)
});

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', '✓', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

// fileProcessor.processData();

module.exports = app;