const { Router } = require('express');
const {getFeesHistory, addFeesHistory, updateFeesHistory, deleteFeesHistory, getAllFeesHistory} = require('../controllers/feesController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');


const feeRoutes = Router();

// Route to get fees history for a student 
feeRoutes.get('/fees/student/:studentId', verifyToken, getFeesHistory);

// Get all students' fees history 
feeRoutes.get('/fees/all', verifyToken, getAllFeesHistory);

// Route to add new fees record 
feeRoutes.post('/fees', verifyToken, addFeesHistory);

// Route to update fees record 
feeRoutes.put('/fees/:id', verifyToken, updateFeesHistory);

// Route to delete fees record 
feeRoutes.delete('/fees/:id', verifyToken, deleteFeesHistory);

module.exports = feeRoutes;