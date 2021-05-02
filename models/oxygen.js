var mongoose = require("mongoose");

var oxygenSchema = new mongoose.Schema({
    
    data: String
    
});

module.exports = mongoose.model("Oxygen", oxygenSchema);