var express 		= require("express"),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport 		= require("passport"),
	localStrategy 	= require("passport-local");
	methodOverride 	= require("method-override");
	flash 			= require("connect-flash");

	User 			= require("../models/user");

	userRoutes 		= require("./user");

var fs = require("fs");

//===============================================================
var router = express.Router({mergeParams: true});
//===============================================================

router.get("/oxygen/getall", function(req, res){
	var obj = {x: 45, y:"sandeep", arr: [45, 6, 76]};
    res.json(obj);
});
router.post("/oxygen/getall", function(req, res){
	console.log(req.body);
});

//==================================================================================

//+++++++++++++++++++++++++++  MIDDLEWARE  +++++++++++++++++++++++++++++++++++++++++
function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated()) next();
	else
		res.redirect("/login");
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;