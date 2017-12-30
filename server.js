const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

PageSchema = require('./model/Page');
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

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));


app.get('/rest/page/*', (req, res) => {
  PageSchema.findOne({}, function(err, obj){
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

fileProcessor.processData();

module.exports = app;