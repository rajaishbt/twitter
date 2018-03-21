var express = require('express');
var session = require('express-session');
var oauth = require('oauth');
var bodyParser = require('body-parser');
var app = express();

//path
var pathToApp = __dirname;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

var _twitterConsumerKey = "NwMyCeenOt6qH6xCOICyS5f5C";
var _twitterConsumerSecret = "Neio7iajRS6m5V252yGdWy9qUX9YvC9jjC0H903HJmGOW16LGQ";

var consumer = new oauth.OAuth(
    "https://api.twitter.com/oauth/request_token", "https://api.twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "https://twitter-tryout.herokuapp.com/login", "HMAC-SHA1");;

app.use(session({ secret: "tweets very secret", resave: false, saveUninitialized: true, cookie: {maxAge: (365 * 24 * 60 * 60 * 1000), path: "/" }}));

app.get('/sessions/connect', function(req, res, next){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + error, 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.end(req.session.oauthRequestToken);
    }
  });
});

app.get('/sessions/callback', function(req, res){
   consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      res.redirect('/home');
    }
  });
});


app.get('/home', function(req, res){
    consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
      } else {
		    var parsedData = JSON.parse(data);
        res.send(parsedData);
      } 
    });
});

app.get('/users/show', function(req, res){
    consumer.get("https://api.twitter.com/1.1/users/show.json?screen_name=" + req.query.screen_name, req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
      } else {
        var parsedData = JSON.parse(data);
        res.send(parsedData);
      } 
    });
});

app.get('/followers/list', function(req, res){
    consumer.get("https://api.twitter.com/1.1/followers/list.json?screen_name=" + req.query.screen_name, req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
      } else {
        var parsedData = JSON.parse(data);
        res.send(parsedData);
      } 
    });
});

app.get('/following/list', function(req, res){
    consumer.get("https://api.twitter.com/1.1/friends/list.json?screen_name=" + req.query.screen_name, req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
      } else {
        var parsedData = JSON.parse(data);
        res.send(parsedData);
      } 
    });
});

app.post('/post/tweets', function(req, res){
    consumer.post("https://api.twitter.com/1.1/statuses/update.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, {status: req.body.status}, '', function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
      } else {
        res.send('success');
      } 
    });
});

app.get('/get/tweets', function(req, res) {
	consumer.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + req.query.screen_name, req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function(error, data, response) {
    if (error) {
			res.redirect('/sessions/connect');
		} else {
			var parsedData = JSON.parse(data);
			res.send(parsedData);
		} 
	});
});

app.get('/sessions/logout', function(req, res) {
		req.session.destroy();
    res.send('logout success');
});

app.get('*', function(req, res) {
  res.sendFile(pathToApp + '/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
