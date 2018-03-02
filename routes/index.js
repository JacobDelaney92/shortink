var express = require('express');
var router = express.Router();
//1.require mongoose
var mongoose = require('mongoose');
var path = require('path');

//2. connect to the database
mongoose.connect('mongodb://jacob92:entershikari17@ds119268.mlab.com:19268/jacobdatabase'); //add details of database

//3. check if we connect ot the databse ?
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

var Schema = mongoose.Schema;

//4. Creating a refrenece to the table we want to create
var shortenUrlSchema = mongoose.Schema({
//5. create properties and values for the url shortner
id:Number,
url:String,
shortUrl:String
});
//6. compiling our schema into a model to input databse
var shortenUrl = mongoose.model('shortenUrl', shortenUrlSchema);
//7. Know we need to create the document/object that holds all the data for our shortenUrlSchema
router.post('/', function(req, res, next) {
console.log('testing post request');
var returnRndomUrl = genRnadomString(8)
//8. add to the post request so we can send it to the server
var urlDocument = new shortenUrl(
  { id: req.body.id,
    url: req.body.url,
    shortUrl:returnRndomUrl
  });

console.log(urlDocument.id);
console.log('-----------------------------------------------');
console.log(urlDocument.url);
//console.log(shortenUrl);
console.log(req.query);
console.log('-----------------------------------------------');


urlDocument.save(function(err){
  if(err){
    res.send("not ok");
  }else{
    res.send(returnRndomUrl);
  }
});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});


/* GET home page. */
/*req requires the .params = '/' then says whatever :short is  */
router.get('/:short', function(req, res, next) {
  shortenUrl.findOne({ 'shortUrl': req.params.short }, function(err, data) {
    if (err) throw err;
    if (data == null) {
      res.send('No result found');
    } else {
      res.redirect(302, data.url);
    }
  });
});


function genRnadomString(number){
var newRandomString = '';
var stringValues = "abcdefghijklmonpqrstuvwxyz123456789";
for(var x = 0; x < number; x++){
var random = Math.floor(Math.random() * stringValues.length);
var randomCharacter = stringValues[random];
newRandomString += randomCharacter;
}
return newRandomString;
}



module.exports = router;
