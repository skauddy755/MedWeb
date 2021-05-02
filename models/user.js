var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
    password: String,
    contact: Number,
	full_name: String,
    job_role: String,
    email: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);