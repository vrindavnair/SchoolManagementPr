import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLibraryRecord, fetchStudentByAdmissionNo } from
 '../../redux-toolkit/librarySlice';
import { useNavigate } from 'react-router-dom';

function LibraryForm() {
  const [newBook, setNewBook] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    division: '',
    bookId: '',
    bookName: '',
    authorName: '',
    borrowDate: '',
    returnDate: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.library.student);
  const isLoading = useSelector((state) => state.library.loading);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));

    if (name === 'admissionNo' && value) {
      dispatch(fetchStudentByAdmissionNo(value));
    }
  };

  useEffect(() => {
    if (student) {
      setNewBook((prev) => ({
        ...prev,
        studentName: student.name,
        class: student.class,
        division: student.division,
      }));
    }
  }, [student]);

  const handleBookSubmit = async (e) => {
    e.preventDefault();

    try {
      const status = newBook.returnDate ? 'Returned' : 'Not Returned';

      const newBookEntry = {
        student: student._id,
        bookId: newBook.bookId,
        bookName: newBook.bookName,
        authorName: newBook.authorName,
        borrowDate: newBook.borrowDate,
        returnDate: newBook.returnDate,
        status,
        studentDetails: {
          name: student.name,
          class: student.class,
          division: student.division,
          admissionNo: student.admissionNo,
        },
      };

      await dispatch(addLibraryRecord(newBookEntry)).unwrap();
      setIsSubmitted(true);

      setTimeout(() => {
        navigate('/library');

        setNewBook({
          admissionNo: '',
          studentName: '',
          class: '',
          division: '',
          bookId: '',
          bookName: '',
          authorName: '',
          borrowDate: '',
          returnDate: '',
        });

        dispatch(resetStudentData());
      }, 1000);
    } catch (error) {
      console.error('Error submitting book form:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-violet-200 shadow-md rounded-lg p-8 w-full max-w-lg">
        <h3 className="text-2xl font-semibold text-center text-violet-700 mb-6">Add Book Details</h3>
        <form onSubmit={handleBookSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admission No:</label>
            <input
              type="text"
              name="admissionNo"
              value={newBook.admissionNo}
              onChange={handleBookChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of Student:</label>
            <input
              type="text"
              name="studentName"
              value={newBook.studentName}
              readOnly
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Class:</label>
            <input
              type="text"
              name="class"
              value={newBook.class}
              readOnly
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Division:</label>
            <input
              type="text"
              name="division"
              value={newBook.division}
              readOnly
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Book ID:</label>
            <input
              type="text"
              name="bookId"
              value={newBook.bookId}
              onChange={handleBookChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Name:</label>
            <input
              type="text"
              name="bookName"
              value={newBook.bookName}
              onChange={handleBookChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author Name:</label>
            <input
              type="text"
              name="authorName"
              value={newBook.authorName}
              onChange={handleBookChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Borrow Date:</label>
            <input
              type="date"
              name="borrowDate"
              value={newBook.borrowDate}
              onChange={handleBookChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Return Date:</label>
            <input
              type="date"
              name="returnDate"
              value={newBook.returnDate}
              onChange={handleBookChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white rounded-md shadow-sm ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-700 focus:ring focus:ring-blue-300'
            }`}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {isSubmitted && (
          <div className="mt-4 text-center text-green-600 font-medium">
            Book added successfully!
          </div>
        )}
        {isLoading && (
          <div className="mt-4 text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default LibraryForm;
