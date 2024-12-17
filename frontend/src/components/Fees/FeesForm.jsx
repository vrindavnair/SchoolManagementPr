import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFee, fetchStudentByAdmissionNo } from '../../redux-toolkit/feeSlice';
import { useNavigate } from 'react-router-dom';

function FeesForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, isLoading, error } = useSelector((state) => state.fees);

  const [newFee, setNewFee] = useState({
    admissionNo: '',
    studentName: '',
    class: '',
    division: '',
    amountPaid: '',
    paidDate: '',
    feesType: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({ ...prev, [name]: value }));

    if (name === 'admissionNo' && value) {
      dispatch(fetchStudentByAdmissionNo(value));
    }
  };

  useEffect(() => {
    if (student) {
      setNewFee((prev) => ({
        ...prev,
        studentName: student.name,
        class: student.class,
        division: student.division,
      }));
    }
  }, [student]);

  const handleFeeSubmit = async (e) => {
    e.preventDefault();

    const totalAmountDue = 1000;
    const status = Number(newFee.amountPaid) >= totalAmountDue ? 'Completed' : 'Pending';

    try {
      const newFeeEntry = {
        student: student._id,
        feesType: newFee.feesType,
        paymentDate: newFee.paidDate,
        amount: Number(newFee.amountPaid),
        status: status,
        studentDetails: {
          name: student.name,
          class: student.class,
          division: student.division,
          admissionNo: student.admissionNo,
        },
      };

      dispatch(addFee(newFeeEntry));
      setIsSubmitted(true);

      setTimeout(() => {
        navigate('/fees');
      }, 1000);
    } catch (error) {
      console.error('Error submitting fee form:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-purple-300 shadow-md rounded-md">
      <h3 className="text-xl font-bold mb-4 text-center text-purple-700">Add Fee Details</h3>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <form onSubmit={handleFeeSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Admission No:</label>
          <input
            type="text"
            name="admissionNo"
            value={newFee.admissionNo}
            onChange={handleFeeChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Name of Student:</label>
          <input
            type="text"
            name="studentName"
            value={newFee.studentName}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Class:</label>
          <input
            type="text"
            name="class"
            value={newFee.class}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Division:</label>
          <input
            type="text"
            name="division"
            value={newFee.division}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Fees Type:</label>
          <select
            name="feesType"
            value={newFee.feesType}
            onChange={handleFeeChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select Fee Type</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Book Fee">Book Fee</option>
            <option value="Other Fee">Other Fee</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Amount Paid:</label>
          <input
            type="number"
            name="amountPaid"
            value={newFee.amountPaid}
            onChange={handleFeeChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Paid Date:</label>
          <input
            type="date"
            name="paidDate"
            value={newFee.paidDate}
            onChange={handleFeeChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 text-white rounded-md ${
            isLoading ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {isSubmitted && (
        <div className="mt-4 text-green-500 font-medium">Payment Successful!</div>
      )}
    </div>
  );
}

export default FeesForm;
