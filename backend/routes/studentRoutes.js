const { Router } = require('express');
const {addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, 
    getStudentByAdmissionNo, getStudentDetails} = require('../controllers/studentController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

const studentRoutes = Router();

// Route to add a new student 
studentRoutes.post('/add-student', verifyToken, addStudent);

// Route to get all students 
studentRoutes.get('/student', getAllStudents);

// Route to get a student by ID 
studentRoutes.get('/student/:id', getStudentById);


// Route to update a student 
studentRoutes.put('/student/:id', verifyToken, updateStudent);

// Route to delete a student 
studentRoutes.delete('/student/:id', verifyToken, deleteStudent);

// Route to get a student by admission number 
studentRoutes.get('/student/admission/:admissionNo', getStudentByAdmissionNo);

studentRoutes.get('/student/details/:id',  getStudentDetails);

module.exports = studentRoutes;
