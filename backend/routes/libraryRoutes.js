const { Router } = require('express');
const {addHistory, getLibraryHistory, getAllLibraryHistory, updateLibraryHistory, deleteLibraryHistory} = require('../controllers/libraryController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');


const libraryRoutes = Router();

// Route to add a new library history record 
libraryRoutes.post('/library', verifyToken, addHistory);

// Route to get library history for a specific student (can be public or protected)
libraryRoutes.get('/library/student/:studentId', verifyToken, getLibraryHistory);

// Route to get all library history 
libraryRoutes.get('/library/all', verifyToken, getAllLibraryHistory);

// Route to update a library history record 
libraryRoutes.put('/library/:id', verifyToken, updateLibraryHistory);

// Route to delete a library history record 
libraryRoutes.delete('/library/:id', verifyToken, deleteLibraryHistory);

module.exports = libraryRoutes;