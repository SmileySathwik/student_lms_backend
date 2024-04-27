const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  coursecode: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category : {type:String , required:true},
  credits : {type:String,required:true}
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = { Course };
