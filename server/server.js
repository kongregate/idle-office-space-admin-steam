var PLAYFAB_LIB = "PlayFabServer.js";

// production values
var PLAYFAB_TITLE_ID = "DF5E";
var PLAYFAB_SECRET_KEY = "6QUSYD6CKE15495ZZKACMJWGK44GKOHOK7WNRUD71G11P9PF9G";

// auto values
// var PLAYFAB_TITLE_ID = "4A86";
// var PLAYFAB_SECRET_KEY = "WCQYPGS9M3EK9WG9G1UEDOUTXZ37ZX3K39R5SQUBNE3NRKNIZT";

// set up Express app
var express = require('express');
var app = express();

// set up authentication module 
var auth = require('http-auth');
var basic = auth.basic({ file: __dirname + "/users.htpasswd"});
app.use(auth.connect(basic));

var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// set up Angular JS hooks
app.use(express.static(__dirname + "/../client"));

// set up PlayFab API
var playFabAPI = require(__dirname + '/../node_modules/playfab-sdk/Scripts/PlayFab/' + PLAYFAB_LIB);
playFabAPI.settings.titleId = PLAYFAB_TITLE_ID;
playFabAPI.settings.developerSecretKey = PLAYFAB_SECRET_KEY;
app.locals.playFabAPI = playFabAPI;

// set up route handlers
app.get('/', function(req, res) {});
var userHandler = require(__dirname + '/handlers/userHandler.js');
app.get('/getPlayerCombinedInfo/:id', userHandler.getPlayerCombinedInfo);
app.put('/updateUserData/:id/:key', userHandler.updateUserData);

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/** Playfab error schema
{
	"code":400,
	"status":"BadRequest",
	"error":"InvalidParams",
	"errorCode":1000,
	"errorMessage": "Invalid input parameters",
	"errorDetails":{
		"PlayFabId":["The PlayFabId field is required."]
	}
}
*/