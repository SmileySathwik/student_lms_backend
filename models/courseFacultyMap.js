const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursefaculty = new Schema({
    coursecode : {type:String,require:true},
    facultyid:{type:String,require:true},
});

const coursefacultymap = mongoose.model("coursefacultymap", coursefaculty);

module.exports = { coursefacultymap };

  