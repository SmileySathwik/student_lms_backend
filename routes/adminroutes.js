const express = require('express')
// const { loginUser } = require('../controllers/usercontrollers')
const { addStudent, getAllStudents, getAllFaculty, checkadminlogin, addFaculty, AddCourse, getAllCourses, deletecourse, deletefaculty, deletestudent, enrolcourse } = require('../controllers/admincontroller')
const adminRoutes = express.Router()

adminRoutes.post('/addstudent',addStudent)
adminRoutes.post('/addfaculty',addFaculty)
adminRoutes.get('/viewallcourses',getAllCourses)
adminRoutes.get('/viewallstudents',getAllStudents)
adminRoutes.get('/viewallfaculty',getAllFaculty)
adminRoutes.post('/checklogin',checkadminlogin)
adminRoutes.post('/addcourse',AddCourse)
adminRoutes.delete('/deletecourse/:cid',deletecourse)
adminRoutes.delete('/deletefaculty/:fid',deletefaculty)
adminRoutes.delete('/deletestudent/:sid',deletestudent)
adminRoutes.post('/enrolcourse',enrolcourse)
// adminRoutes.get('/viewallcourses',getAllcourse)


module.exports = {
    adminRoutes
}