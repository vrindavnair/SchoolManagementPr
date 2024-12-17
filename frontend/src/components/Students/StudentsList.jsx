import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";
import { fetchStudents, deleteStudent, updateStudent } from '../../redux-toolkit/studentSlice';
import StudentDetailsModal from './StudentDetailsModal';

function StudentsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { students = [], isLoading, error } = useSelector((state) => state.students);
    const user = useSelector((state) => state.auth.user);

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [isSaving, setIsSaving] = useState(false); 

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            dispatch(deleteStudent(id));
        }
    };

    const handleEditClick = (student) => {
        setEditingId(student._id);
        setEditFormData({ ...student });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = (id) => {
        setIsSaving(true);
        dispatch(updateStudent({ id, studentData: editFormData })).then(() => {
            setEditingId(null);
            setIsSaving(false);
        });
    };

    const handleStudentClick = (id) => {
        setSelectedStudentId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStudentId(null); 
    };

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button className="p-2 rounded-full text-blue-600 hover:bg-gray-100" onClick={() => navigate(-1)}>
                    <IoChevronBackOutline size={24} />
                </button>
                <h2 className="text-3xl text-center text-purple-700 font-semibold ml-4">All Student Details</h2>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full table-auto border-collapse border border-gray-200 bg-purple-300">
                <thead className="bg-purple-500 text-purple-100">
                    <tr>
                        <th className="px-4 py-2 border-b">Admission No</th>
                        <th className="px-4 py-2 border-b">Student Name</th>
                        <th className="px-4 py-2 border-b">Class</th>
                        <th className="px-4 py-2 border-b">Division</th>
                        <th className="px-4 py-2 border-b">Gender</th>
                        <th className="px-4 py-2 border-b">Date of Birth</th>
                        <th className="px-4 py-2 border-b">Parent Name</th>
                        <th className="px-4 py-2 border-b">Contact No</th>
                        <th className="px-4 py-2 border-b">Place</th>
                        <th className="px-4 py-2 border-b">Date of Joining</th>
                        <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.filter(student => student).map(student => (
                            <tr key={student._id} className="hover:bg-gray-50">
                                {editingId === student._id ? (
                                    <>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="admissionNo" value={editFormData.admissionNo} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="name" value={editFormData.name} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="class" value={editFormData.class} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="division" value={editFormData.division} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="gender" value={editFormData.gender} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="date" name="dateOfBirth" value={editFormData.dateOfBirth} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="parentName" value={editFormData.parentName} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="contactNo" value={editFormData.contactNo} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="text" name="place" value={editFormData.place} onChange={handleInputChange} /></td>
                                        <td><input className="w-full p-2 border border-gray-300 rounded" type="date" name="dateOfJoining" value={editFormData.dateOfJoining} onChange={handleInputChange} /></td>
                                        <td>
                                            <button className="p-2 text-white bg-green-500 rounded hover:bg-green-600" onClick={() => handleSave(student._id)}>
                                                {isSaving ? <FaCheck /> : <TiTick />}
                                            </button>
                                            <button className="p-2 text-white bg-red-500 rounded hover:bg-red-600 ml-2" onClick={handleCancelEdit}>
                                                <FaTimes />
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{student.admissionNo}</td>
                                        <td className="text-purple-700 cursor-pointer" onClick={() => handleStudentClick(student._id)}>{student.name}</td>
                                        <td>{student.class}</td>
                                        <td>{student.division}</td>
                                        <td>{student.gender}</td>
                                        <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                                        <td>{student.parentName}</td>
                                        <td>{student.contactNo}</td>
                                        <td>{student.place}</td>
                                        <td>{new Date(student.dateOfJoining).toLocaleDateString()}</td>
                                        <td>
                                            {user?.role === 'admin' && (
                                                <>
                                                    <button className="p-2 text-purple-500 hover:text-yellow-600" onClick={() => handleEditClick(student)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="p-2 text-red-500 hover:text-red-600 ml-2" onClick={() => handleDelete(student._id)}>
                                                        <FaTrash />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center py-4">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedStudentId && (
                <StudentDetailsModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    studentId={selectedStudentId}
                />
            )}
        </div>
    );
}

export default StudentsList;

