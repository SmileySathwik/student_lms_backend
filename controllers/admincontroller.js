const express = require("express");
const mongoose = require("mongoose");
const { Admin } = require("../models/admin");
const { Assignment } = require("../models/assignment");
const { Course } = require("../models/course");
const { Faculty } = require("../models/faculty");
const { Grade } = require("../models/grade");
const { Student } = require("../models/student");
const {coursestudentmap} = require('../models/courseStudentMap')
const {coursefacultymap} = require('../models/courseFacultyMap')

const addStudent = async (req, res, next) => {
  try {
    const { name, sid, email, phoneNumber, password, gender } = req.body;
    console.log(name, sid, email, phoneNumber, password, gender);
    if (!name || !email || !phoneNumber || !password || !gender || !sid) {
      return res.status(400).json({ message: "invalid data" });
    }
    console.log(name, email, phoneNumber, password, gender, sid);
    const isAlreadyExist = await Student.findOne({ email: email });
    if (isAlreadyExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const user = await Student.create({
      name: name,
      sid: sid,
      email: email,
      phoneNumber: phoneNumber,
      password: password, // password should store in hash
      gender: gender,
    });
    await user.save();
    if (!user) {
      return res.status(400).json({ message: "error is creating student" });
    }
    res.status(201).json({ Student: user });
  } catch (error) {
    console.log("error", error);
  }
};
const addFaculty = async (req, res, next) => {
  try {
    const { name, fid, email, phoneNumber, password, gender ,course} = req.body;
    console.log(name, fid, email);
    if (!name || !email || !phoneNumber || !password || !gender || !fid || !course) {
      return res.status(400).json({ message: "invalid data" });
    }
    // console.log( name, email, phoneNumber, password, gender, role)
    const isAlreadyExist = await Faculty.findOne({ email: email });
    if (isAlreadyExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const user = await Faculty.create({
      name: name,
      fid: fid,
      email: email,
      phoneNumber: phoneNumber,
      password: password, // password should store in hash
      gender: gender,
      course:course
    });
    await user.save();

    // const existingMapping = await coursefacultymap.findOne({ coursecode: course, facultyid: fid });

    // if (existingMapping) {
    //   return res.status(400).json({ error: 'faculty is already enrolled in this course.' });
    // }

    // // Create new mapping
    // const newMapping = new coursefacultymap({
    //   coursecode: course,
    //   facultyid: fid,
    // });

    // // Save the mapping to the database
    // await newMapping.save();
    // console.log("succcessfull Mapping!!")

    // res.status(201).json({ message: 'faculty enrolled in the course successfully.' });


    if (!user) {
      return res.status(400).json({ message: "error is creating faculty" });
    }
    res.status(201).json({ Student: user });
  } catch (error) {
    console.log("error", error);
  }
};

const AddCourse = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    // const fobj = await Faculty.findOne({ fid: data.facultyid });
    // console.log(fobj);
    const courseobj = await Course.findOne({ coursecode: data.coursecode });
    if (!courseobj) {
      const course = await Course.create({
        name: data.name,
        coursecode: data.coursecode,
        credits: data.credits,
        description: data.description,
        category : data.category,
        // student: [],
      });
      await course.save();
      res.status(201).json(course);
      console.log("Course created successfully");
    } else {
      console.log(courseobj)
      console.log("Data invalid !!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    console.log("Sending Data!!");
    const courses = await Course.find({});
    if (courses != null) {
      console.log("Send All courses Successfully !!");
      res.status(200).json(courses);
    }
  } catch (error) {
    res.status(400).send("Error while Sending Courses!!");
  }
};

const deletecourse = async(req,res,next)=>{
  try {
    console.log("Trying to delete Course")
    const {cid} = req.params;
    const c_data= await Course.findOne({"coursecode":cid})
    console.log(cid)
    if(c_data==null){
      console.log("no delete operation done!1")
      res.status(400).send("No Data found!! Of course this is from backend.. no need to write this statement :::Laugh ")
    }
    else{
      console.log("deleted successfully")
      await Course.deleteOne({"coursecode":cid})
      res.status(200).send("deleted Successfully !!")
    }


  } catch (error) {
    
  }
}

const getAllStudents = async (req, res, next) => {
  try {
    const student = await Student.find({});
    console.log(student);
    if (!student) {
      return res.send("No Data");
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllFaculty = async (req, res, next) => {
  try {
    console.log("Sending Faculty Data");
    const faculty = await Faculty.find({});
    console.log(faculty);
    if (!faculty) {
      return res.send("No Data");
    }
    res.json(faculty);
  } catch (error) {
    console.log("Error sending data");
    res.status(500).send(error.message);
  }
};

const deletefaculty = async(req,res,next) =>{
  try {
    const fid =  await req.params;
    console.log(fid.fid.toString());
    const data = await Faculty.findOne({"fid":fid.fid.toString()})
    if(!data){
      res.status(400).send("Error While Deleting faculty!!")
    }
    else{
      await Faculty.deleteOne({"fid":fid.fid.toString()});
      res.status(200).send("Successfully deleted")
    }

  } catch (error) {
    console.log(error.message) 
  }
}

const deletestudent = async(req,res,next)=>{
  try {
    const input = req.params;
    console.log(input.sid)
    const std = await Student.findOne({"sid":input.sid})
    if(!std){
      res.status(400).send("No such student Found!!")
    }
    else{
      await Student.deleteOne({"sid":input.sid});
      res.status(200).json(std);
    }
  } catch (error) {
    console.log("error occured!",error.message)
  }
}

/*

const deleteUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (user != null) {
      await User.deleteOne({ email: email });
      res.send("deleted Successfully");
    } else {
      res.send("User Not Found!!");
    }
  } catch (error) {
    res.send(error.message);
  }
};
*/
const checkadminlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await Admin.findOne({
      email,
      password,
    });
    if (user) res.status(200).json(user);
    else {
      console.log("Login failed"),
        res.status(400).send("No Such Admin found!!");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const enrolcourse = async (req, res) => {
  const { sid, cid } = req.body;
  console.log(sid,cid)
  console.log("I am at enrol course!!")
  try {
    // Check if the student and course exist (you may want to add more validation)
   // Create a new document for the studentcoursemap schema
   const enrollment = new coursestudentmap({
    studentid: sid,
    coursecode: cid,
  });

  // Save the enrollment document to the database
  await enrollment.save();

  return enrollment;
  } catch (error) {
    console.error('Error enrolling student in course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  addStudent,
  deletestudent,

  addFaculty,
  getAllFaculty,
  deletefaculty,
  getAllStudents,

  checkadminlogin,

  AddCourse,
  getAllCourses,
  deletecourse,
  enrolcourse,
};
