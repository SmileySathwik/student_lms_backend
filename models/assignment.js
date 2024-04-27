const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  course: { type:String,required:true },
  id : {type:String,required:true },
  filename : {type:String,required:true},
  uploadedBy : {type:String,required:true}
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

module.exports = { Assignment };
