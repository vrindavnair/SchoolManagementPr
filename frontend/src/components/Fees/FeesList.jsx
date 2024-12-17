import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFees, deleteFee, updateFeesHistory } from '../../redux-toolkit/feeSlice';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

function FeesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fees, isLoading, error } = useSelector((state) => state.fees);
  const { user } = useSelector((state) => state.auth);

  const [editingRecordId, setEditingRecordId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    feesType: '',
    amount: '',
    paymentDate: '',
  });

  useEffect(() => {
    dispatch(fetchFees());
  }, [dispatch]);

  const handleEdit = (fee) => {
    setEditingRecordId(fee._id);
    setEditedRecord({
      feesType: fee.feesType,
      amount: fee.amount,
      paymentDate: new Date(fee.paymentDate).toISOString().split('T')[0],
    });
  };

  const handleSave = async (id) => {
    setIsSaving(true);
    await dispatch(updateFeesHistory({ id, updatedRecord: { ...editedRecord } }));
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
    if (window.confirm('Are you sure you want to delete this fee entry?')) {
      dispatch(deleteFee(id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-deep-purple-300">
      <button
        className="flex items-center text-blue-500 hover:text-blue-700 font-medium mb-4"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackOutline className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">Students Fees History</h2>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-purple-300 border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-purple-500 text-purple-100">
              <th className="px-4 py-2 text-left">Admission No</th>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Division</th>
              <th className="px-4 py-2 text-left">Fees Type</th>
              <th className="px-4 py-2 text-left">Amount Paid</th>
              <th className="px-4 py-2 text-left">Paid Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.length > 0 ? (
              fees.map((fee) => (
                <tr
                  key={fee._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2">{fee.studentDetails?.admissionNo}</td>
                  <td className="px-4 py-2">{fee.studentDetails?.name}</td>
                  <td className="px-4 py-2">{fee.studentDetails?.class}</td>
                  <td className="px-4 py-2">{fee.studentDetails?.division}</td>
                  <td className="px-4 py-2">
                    {editingRecordId === fee._id ? (
                      <input
                        type="text"
                        name="feesType"
                        value={editedRecord.feesType || ''}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      fee.feesType
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRecordId === fee._id ? (
                      <input
                        type="number"
                        name="amount"
                        value={editedRecord.amount || ''}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      fee.amount
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRecordId === fee._id ? (
                      <input
                        type="date"
                        name="paymentDate"
                        value={editedRecord.paymentDate || ''}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      new Date(fee.paymentDate).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-4 py-2">{fee.status}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    {(user?.role === 'admin' || user?.role === 'staff') && (
                      <>
                        {editingRecordId === fee._id ? (
                          <>
                            <button
                              className="text-green-500 hover:text-green-700"
                              onClick={() => handleSave(fee._id)}
                            >
                              {isSaving ? 'Saving...' : <TiTick />}
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={handleCancelEdit}
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleEdit(fee)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(fee._id)}
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No fees records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeesList;
