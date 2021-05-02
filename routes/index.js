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

router.get("/", function(req, res){
	res.redirect("/home");
});

router.get("/prediction", function(req, res){
	res.render("predict.ejs");
});

router.get("/rishi", function(req, res){
	res.render("RishiRaj.ejs");
});

router.get("/home", function(req, res){
	res.render("index.ejs");
});

router.get("/users", function(req, res){
	User.find({}, function(err, items){
		if(err) console.log("ERROR in Finding all users array...");
		else{
			res.render("users.ejs", {items: items});
		}
	});
});
//--------------------------------------------------------------------
router.get("/register", function(req, res){
	res.render("signup.ejs");
});

router.post("/register", function(req, res){
	//res.send("Got New user");
	console.log(req.body);
    console.log("POST REQ RECEIVED...");
	
	var nu = new User({
		username: req.body.username,
		contact: req.body.contact,
		full_name: req.body.full_name,
		email: req.body.email,
		job_role: req.body.job_role,
	});

	User.register(nu, req.body.password, function(err, item){
		if(err)
		{
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			console.log(item);
			var userId = item._id;
			req.flash("success", "Successfully signed you in...!!");
			res.redirect("/dashboard/"+userId);
		});
	});
});

//--------------------------------------------------------------------------
router.get("/login", function(req, res){
	res.render("login.ejs");
});

//--------------------------------------------------------------------------
router.get("/dashboard", isLoggedIn, function(req, res){
	var userId = req.user._id;
	res.redirect("/dashboard/"+userId);
});
router.get("/dashboard/:userId", isLoggedIn, function(req,res){
	//res.send("Okay... This is your dashboard...");
    //res.render("dashboard", {userId:req.params.userId});
    User.findById(req.params.userId, function(err, item){
		console.log("USER OBJECT follows next...");
        console.log(item);
        res.render("dashboard", {user: item});
	});
});
//--------------------------------------------------------------------------

router.get("/covid_resources", function(req, res){
	res.render("covid_resources.ejs");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/dashboard",
	failureRedirect: "/login"
}) , function(req, res){
	console.log("Okay..Logged in ...!!");
});
//---------------------------------------------------------------------------
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully Logged you out...!!!");
	res.redirect("/home");
});
//---------------------------------------------------------------------------

//===========================================================================
router.post("/prediction", function(req, res){
	var mf = req.files.xrayfile;
	var fn = mf.name;
	console.log(mf, fn);
	mf.mv("./xray_data/"+fn, function(err){
		if(err) console.log(err);
		else
		{
			console.log("File uploaded successfully...");
		}
	});
});
//===========================================================================

//+++++++++++++++++++++  MIDDLEWARE  +++++++++++++++++++++++++++++++++++++++++++++++
function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated()) next();
	else
		res.redirect("/login");
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;