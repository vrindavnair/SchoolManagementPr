import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent } from '../../redux-toolkit/studentSlice'; 
import { useNavigate } from 'react-router-dom';

function StudentsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = useSelector((state) => state.auth.user); 
  const [studentDetails, setStudentDetails] = useState({
    admissionNo: '',
    name: '',
    class: '',
    division: '',
    gender: '',
    dateOfBirth: '',
    parentName: '',
    contactNo: '',
    place: '',
    dateOfJoining: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(studentDetails));
  
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/students'); 
    }, 1000);

    setStudentDetails({
      admissionNo: '',
      name: '',
      class: '',
      division: '',
      gender: '',
      dateOfBirth: '',
      parentName: '',
      contactNo: '',
      place: '',
      dateOfJoining: ''
    });
  };

  if (user?.role !== 'admin') {
    return <p className="text-center text-red-500">You do not have permission to add students.</p>; 
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-violet-300 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-purple-700 mb-6 text-center">Add New Student Details</h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Admission No:</label>
          <input
            type="text"
            name="admissionNo"
            value={studentDetails.admissionNo}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Name of Student:</label>
          <input
            type="text"
            name="name"
            value={studentDetails.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Class:</label>
          <input
            type="text"
            name="class"
            value={studentDetails.class}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Division:</label>
          <select
            name="division"
            value={studentDetails.division}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Gender:</label>
          <select
            name="gender"
            value={studentDetails.gender}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={studentDetails.dateOfBirth}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Name of Parent:</label>
          <input
            type="text"
            name="parentName"
            value={studentDetails.parentName}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={studentDetails.contactNo}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Place:</label>
          <input
            type="text"
            name="place"
            value={studentDetails.place}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={studentDetails.dateOfJoining}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Student
        </button>
      </form>
      
      {isSubmitted && (
        <div className="mt-4 text-green-500 text-center">Student added successfully!</div>
      )}
    </div>
  );
}

export default StudentsForm;
