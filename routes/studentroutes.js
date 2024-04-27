const express = require("express");
const studentController = require("../controllers/studentcontroller");
const upload = require("../controllers/fileUploadAssignment");
const studentRoutes = express.Router();

studentRoutes.post("/checklogin", studentController.checklogin);
studentRoutes.get("/getenrolledcourses",studentController.getenrolcourses)
studentRoutes.get('/assignments/:courseId', studentController.getAssignmentsByCourseId);
studentRoutes.get('/eventpdf/:filename',studentController.eventpdf)

studentRoutes.post('/assignment/upload',upload.single('file'),studentController.uploadAssignment)


module.exports = { studentRoutes };
