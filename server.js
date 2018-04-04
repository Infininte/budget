const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var pages = require('./endpoints/pages');
var scraps = require('./endpoints/scraps');

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
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/rest/page', pages);

app.use('/rest/scrap', scraps);

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', '✓', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

// fileProcessor.processData();

module.exports = app;