const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  assignment: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  grade: { type: Number },
  feedback: { type: String },
  // Other grade details like submission time, etc.
});

const Grade = mongoose.model("Grade", GradeSchema);

module.exports = { Grade };
