var express 		= require("express"),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport 		= require("passport"),
	localStrategy 	= require("passport-local");
	methodOverride 	= require("method-override");
	flash 			= require("connect-flash");

	User 			= require("../models/user");

	userRoutes 			= require("./user");

//===============================================================
var router = express.Router({mergeParams: true});
//===============================================================

router.get("/", function(req, res){
	res.redirect("/home");
});

router.get("/users/sayhi", function(req, res){
	res.render("index.ejs");
});

//------------------------------------------------------------------------

//+++++++++++++++++++++  MIDDLEWARE  +++++++++++++++++++++++++++++++++++++++++++++++
function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated()) next();
	else
		res.redirect("/login");
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;