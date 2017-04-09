// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


var ram = require('random-access-memory')
var memoryStore = function (file) {
  return ram()
}

var LogFeed = require('./json-feed')

var feed = new LogFeed(memoryStore, process.env.FEED_KEY)

feed.open(function () {
  feed.on('log', function (message) {
    console.log('log', message.content)
  })
})
// setInterval(function () { console.log(feed.log) } , 15000)
// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (request, response) {
  response.send(feed);
});

// Here are the original express routes for public/index.html
/*
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
