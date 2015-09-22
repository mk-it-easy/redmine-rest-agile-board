var express = require('express');

var app = express();
var path = require('path');
var https = require('https');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html' + '/scrumboard.html'));
});

app.get('/burndown', function (req, res){
    res.sendFile(path.join(__dirname + '/html/burndown.html'))
})

app.get('/sprintdata', function (req, res) {
    res.sendFile(path.join(__dirname + '/sprintdata' + '/sprintdata.json'))
})

app.get('/todos', function(req, res) {
    var options = {
        hostname: 'redmine.ti8m.ch',
        port: 443,
        path: '/issues.json?limit=1000000',
        method: 'GET',
        headers: {
            'X-Redmine-API-Key' : 'ADD_PRIVATE_API_KEY_HERE'
        }
    };

    var req = https.request(options, function(response) {
      console.log("statusCode: ", response.statusCode);
      console.log("headers: ", response.headers);

      var body = '';

      response.on('data', function(d) {
        body += d;
      });

      response.on('end', function(d) {
        res.send(body);
      });
    });
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });
});

app.get('/versions', function(req, res) {
    var options = {
        hostname: 'redmine.ti8m.ch',
        port: 443,
        path: '/projects/six-paymit/versions.json',
        method: 'GET',
        headers: {
            'X-Redmine-API-Key' : 'ADD_PRIVATE_API_KEY_HERE'
        }
    };

    var req = https.request(options, function(response) {
          console.log("statusCode: ", response.statusCode);
          console.log("headers: ", response.headers);

          var body = '';

          response.on('data', function(d) {
            body += d;
          });

          response.on('end', function(d) {
            res.send(body);
          });
        });
        req.end();

        req.on('error', function(e) {
          console.error(e);
        });
});

app.listen(3000);
