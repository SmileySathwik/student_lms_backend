const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursestudent = new Schema({
    coursecode : {type:String,require:true},
    studentid:{type:String,require:true},
});
  
const coursestudentmap = mongoose.model("coursestudentmap", coursestudent);

module.exports = { coursestudentmap };
  