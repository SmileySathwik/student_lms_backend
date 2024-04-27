const express = require("express");
const mongoose = require("mongoose");
const { Faculty } = require("../models/faculty");
const multer = require("multer");

const { Assignment } = require('../models/assignment');



const checklogin = async (req, res, next) => {
  const input = await req.body;
  const data = await Faculty.findOne({
    email: input.email,
    password: input.password,
  });
  console.log(input, data);
  if (!data) {
    res.status(400).send("Invalid Credentials");
  } else {
    console.log("Login Successfull !!");
    res.status(200).json(data);
  }
};

const mycourse = async (req, res, next) => {
  console.log("Came to my course faculty");

  const { course } = req.params;
  console.log(course);
};


async function uploadAssignment(req, res){
  try {
    // Create a new assignment instance with file details
    const newAssignment = new Assignment({
      name: req.body.title,
      description: req.body.description,
      course: req.body.course,
      id: req.body.id,
      filename: req.file.filename, // Save the filename in MongoDB
      uploadedBy: req.body.uploadedBy
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
  mycourse,
  uploadAssignment
};
