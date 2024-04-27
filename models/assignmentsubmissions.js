const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Assignmentsubmission = new Schema({
  submissionId: { type: String, required: true },
  studentId: { type: String, required: true },
  assignmentId: { type: String, required: true },
  filename: { type: String, required: true },
  course:{type:String,required:true}
});

const AssignmentSubmission = mongoose.model("AssignmentSubmission", Assignmentsubmission);

module.exports = { AssignmentSubmission };
