const express = require("express");
const { Student } = require("../models/student");
const { Course } = require("../models/course");
const {AssignmentSubmission} = require('../models/assignmentsubmissions');
const {Assignment} = require('../models/assignment');
const path = require("path");
const fs = require("fs");
const { coursestudentmap } = require("../models/courseStudentMap");

const checklogin = async (req, res, next) => {
  const input = await req.body;
  const data = await Student.findOne({
    email: input.email,
    password: input.password,
  });
  console.log(data);
  if (!data) {
    res.status(400).send("Invalid Credentials");
  } else {
    console.log("Login Successfull !!");
    res.status(200).json(data);
  }
};


const getenrolcourses = async (req, res, next) => {
  try {
    const studentdata = await req.query; 
    console.log("Came to getenrolcourses with sid ", studentdata.sid );

    // Find all coursecodes for the given studentid
    const courseStudentMapData = await coursestudentmap.find({ studentid: studentdata.sid });

    console.log(courseStudentMapData)
    
    // Extract coursecodes
    const courseCodes = courseStudentMapData.map(item => item.coursecode);
    
    // Find courses based on coursecodes
    const courses = await Course.find({ coursecode: { $in: courseCodes } });

    console.log(courses)

    // Send courses data to the frontend
    res.status(200).json({ courses: courses });

  }catch(error){
    console.log(error.message);
    res.status(400).send("Error while getting enroled courses!!");
  }
  //  await Course.find({ student: { $in: [sid] } })
  // .then((courses) => {  
  //   console.log(courses); 
  // })
  // .catch((err) => console.error(err));
  // } catch (error) {
  //   console.log(error.message);
  

};

const getAssignmentsByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required as a query parameter' });
    }

    // Find assignments for the provided courseId
    const assignments = await Assignment.find({ course: courseId });

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found for the provided course ID' });
    }

    // Return the list of assignments
    res.status(200).json({ assignments });
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const eventpdf = async (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../media/assignments", filename);
  console.log(filepath);

  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading image file");
    }

    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream"; // Default to octet-stream (binary data)

    if (ext === ".png") {
      contentType = "image/png";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".pdf") {
      contentType = "application/pdf";
    } else if (ext === ".txt") {
      contentType = "text/plain";
    }

    res.setHeader("Content-Type", contentType);
    res.send(data);
  });
};

async function uploadAssignment(req, res){
  try {
    // Create a new assignment instance with file details
    
    const newAssignment = new AssignmentSubmission({
      submissionId :req.body.submissionId,
      studentId : req.body.sid,
      assignmentId:req.body.assignmentId,
      filename:req.body.filename
    });

    // Save the assignment to MongoDB
    const savedAssignment = await newAssignment.save();
    res.json({message: 'Assignment uploaded.'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}


module.exports = {
  checklogin,
  getenrolcourses,
  getAssignmentsByCourseId,
  eventpdf,
  uploadAssignment
};
