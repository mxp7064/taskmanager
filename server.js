const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err)
  require('./app/routes')(app, client.db("taskmanager"));
  
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})