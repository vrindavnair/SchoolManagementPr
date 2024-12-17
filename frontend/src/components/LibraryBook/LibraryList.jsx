import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibraryHistory, updateLibraryRecord, deleteLibraryRecord } from '../../redux-toolkit/librarySlice';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

function LibraryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookHistory, loading, error } = useSelector((state) => state.library);
  const user = useSelector((state) => state.auth.user);

  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({
    bookId: '',
    bookName: '',
    authorName: '',
    borrowDate: '',
    returnDate: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchLibraryHistory());
  }, [dispatch]);

  const handleEdit = (book) => {
    setEditingRecordId(book._id);
    setEditedRecord({
      bookId: book.bookId,
      bookName: book.bookName,
      authorName: book.authorName,
      borrowDate: new Date(book.borrowDate).toISOString().split('T')[0],
      returnDate: new Date(book.returnDate).toISOString().split('T')[0],
    });
  };

  const handleSave = async (id) => {
    setIsSaving(true);
    await dispatch(updateLibraryRecord({ id, updatedRecord: { ...editedRecord, _id: id } }));
    setIsSaving(false);
    setEditingRecordId(null);
  };

  const handleCancelEdit = () => {
    setEditingRecordId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteLibraryRecord(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          onClick={() => navigate(-1)}
        >
          <IoChevronBackOutline className="text-xl" /> Back
        </button>

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Students Library History</h2>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto ">
          <table className="min-w-full bg-purple-300 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-purple-500 text-purple-100">
                <th className="border border-gray-200 px-4 py-2">Admission No</th>
                <th className="border border-gray-200 px-4 py-2">Student Name</th>
                <th className="border border-gray-200 px-4 py-2">Class</th>
                <th className="border border-gray-200 px-4 py-2">Division</th>
                <th className="border border-gray-200 px-4 py-2">Book ID</th>
                <th className="border border-gray-200 px-4 py-2">Book Name</th>
                <th className="border border-gray-200 px-4 py-2">Author Name</th>
                <th className="border border-gray-200 px-4 py-2">Borrow Date</th>
                <th className="border border-gray-200 px-4 py-2">Return Date</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookHistory.length > 0 ? (
                bookHistory.map((book) => (
                  <tr key={book._id} className="even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">
                      {book.studentDetails?.admissionNo}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {book.studentDetails?.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {book.studentDetails?.class}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {book.studentDetails?.division}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingRecordId === book._id ? (
                        <input
                          type="text"
                          name="bookId"
                          value={editedRecord.bookId || ''}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        book.bookId
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingRecordId === book._id ? (
                        <input
                          type="text"
                          name="bookName"
                          value={editedRecord.bookName || ''}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        book.bookName
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingRecordId === book._id ? (
                        <input
                          type="text"
                          name="authorName"
                          value={editedRecord.authorName || ''}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        book.authorName
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingRecordId === book._id ? (
                        <input
                          type="date"
                          name="borrowDate"
                          value={editedRecord.borrowDate || ''}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        new Date(book.borrowDate).toLocaleDateString()
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {editingRecordId === book._id ? (
                        <input
                          type="date"
                          name="returnDate"
                          value={editedRecord.returnDate || ''}
                          onChange={handleChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        new Date(book.returnDate).toLocaleDateString()
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{book.status}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {(user?.role === 'admin' || user?.role === 'librarian') && (
                        <div className="flex items-center gap-2">
                          {editingRecordId === book._id ? (
                            <>
                              <button
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                onClick={() => handleSave(book._id)}
                                disabled={isSaving}
                              >
                                {isSaving ? <FaSave /> : <TiTick />}
                              </button>
                              <button
                                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                                onClick={handleCancelEdit}
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                onClick={() => handleEdit(book)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(book._id)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4">
                    No books history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LibraryList;
