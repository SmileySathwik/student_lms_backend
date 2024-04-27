const express = require("express");
const controller = require("../controllers/facultycontroller");
const facultyRoutes = express.Router();

const assignmentFileUploader = require('../controllers/fileUploadAssignment');
const upload = require("../controllers/fileUploadAssignment");

facultyRoutes.post('/checklogin', controller.checklogin)
facultyRoutes.post('/mycourse/:course', controller.mycourse)

facultyRoutes.post('/assignment/upload', upload.single('file') , controller.uploadAssignment);

module.exports = { facultyRoutes };
