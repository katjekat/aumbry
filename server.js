// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

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

app.get('/', function (request, response) {
  response.send(feed)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
