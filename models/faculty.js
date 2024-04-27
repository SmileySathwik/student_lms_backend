const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacultySchema = new Schema(
  {
    name: { type: String, required: true },
    fid: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Faculty = mongoose.model("Faculty", FacultySchema);

module.exports = { Faculty };
