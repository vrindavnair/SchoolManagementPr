const LibraryHistory = require('../models/LibraryRecord.js');
const Student = require('../models/Student.js');


// Add library history
const addHistory = async (req, res) => {
    try {
        const { bookId, bookName, authorName, borrowDate, returnDate, status, student } = req.body;  
        const studentDetails = await Student.findById(student); 
        if (!studentDetails) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Create new library history record
        const newLibraryHistory = new LibraryHistory({
            bookId,
            bookName,
            authorName,
            borrowDate,
            returnDate,
            status,
            student: studentDetails._id,
            studentDetails: { 
                name: studentDetails.name, 
                class: studentDetails.class, 
                division: studentDetails.division, 
                admissionNo: studentDetails.admissionNo 
            }  
        });
        await newLibraryHistory.save();
        res.status(201).json({ message: 'Library history added successfully', newLibraryHistory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add library history', error: error.message });
    }
};

// Get library history for a student
const getLibraryHistory = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const libraryRecords = await Library.find({ studentId });
        if (!libraryRecords || libraryRecords.length === 0) {
            return res.status(404).json({ message: 'No library records found for this student.' });
        }
        return res.status(200).json(libraryRecords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all library history
 const getAllLibraryHistory = async (req, res) => {
    try {
        const allLibraryHistory = await LibraryHistory.find().populate('student'); 
        res.json(allLibraryHistory);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching library history', details: err.message });
    }
};

// Update library history
 const updateLibraryHistory = async (req, res) => {
    try {
        const updatedHistory = await LibraryHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHistory) {
            return res.status(404).json({ error: 'Library record not found' });
        }
        res.json(updatedHistory);
    } catch (err) {
        res.status(400).json({ error: 'Error updating library record', details: err.message });
    }
};

// Delete library history
 const deleteLibraryHistory = async (req, res) => {
    try {
        const deletedHistory = await LibraryHistory.findByIdAndDelete(req.params.id);
        if (!deletedHistory) {
            return res.status(404).json({ error: 'Library record not found' });
        }
        res.json({ message: 'Library record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting record', details: err.message });
    }
};

module.exports = {
    addHistory,
    getLibraryHistory,
    getAllLibraryHistory,
    updateLibraryHistory,
    deleteLibraryHistory,
};