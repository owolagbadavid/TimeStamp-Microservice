// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var { DateTime } = require('luxon');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.route('/api/:date?').get(function(req, res){
if(!req.params.date){
 var curDate = DateTime.now();
} 
  else if(!(DateTime.fromJSDate(new Date(req.params.date))).isValid){
    var curDate = DateTime.fromMillis(Number(req.params.date))
  }
  else{
  var curDate = DateTime.fromJSDate(new Date(req.params.date))
  }
if(!curDate.isValid){
  res.json({"error":"Invalid Date"})
}
else{
  res.json({"unix":curDate.valueOf(),"utc":curDate.toHTTP()})
}
}
).post(
  function(req, res){
    if(!req.params.date){
     var curDate = DateTime.now();
    } 
      else if(!(DateTime.fromJSDate(new Date(req.params.date))).isValid){
        var curDate = DateTime.fromMillis(Number(req.params.date))
      }
      else{
      var curDate = DateTime.fromJSDate(new Date(req.params.date))
      }
    if(!curDate.isValid){
      res.json({"error":"Invalid Date"})
    }
    else{
      res.json({"unix":curDate.valueOf(),"utc":curDate.toHTTP()})
    }
    }
)
