var express 		= require("express"),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport 		= require("passport"),
	localStrategy 	= require("passport-local"),
	methodOverride 	= require("method-override"),
	flash 			= require("connect-flash"),
	upload			= require("express-fileupload")

    User 			= require("./models/user"),
	// seedDB 			= require("./seeds");

	indexRoutes 		= require("./routes/index");
	userRoutes 			= require("./routes/user");
	oxygenRoutes 		= require("./routes/oxygen");

//seedDB();
////console.log(__dirname);

mongoose.connect("mongodb://localhost/xray1",{useUnifiedTopology:true, useNewUrlParser:true});

var app = express();
app.use(upload());
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true, useNewUrlParser:true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(flash());

//=====================================================
//-----------PASSPORT CONFIG.--------------------------
app.use(require("express-session")({
	secret: "Rusty is still the cutest DOG...",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

//=====================================================

app.use(indexRoutes);
app.use(userRoutes);
app.use(oxygenRoutes);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(5000, "localhost", function(){
	console.log("Web Server is running at PORT: 5000 ...");
});