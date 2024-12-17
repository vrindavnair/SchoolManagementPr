import { useNavigate } from 'react-router-dom';
import FeesForm from '../../components/Fees/FeesForm';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-semibold">Staff Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/students')} 
            className="font-semibold text-white py-2 px-4 rounded"
          >
            Students Details
          </button>
          <button 
            onClick={() => navigate('/fees')} 
            className="font-semibold text-white py-2 px-4 rounded"
          >
            Fees History
          </button>
          <button 
            onClick={() => navigate('/library')} 
            className="font-semibold text-white py-2 px-4 rounded"
          >
            Library History
          </button>
          <button 
            className="font-semibold text-white py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <FeesForm />
    </div>
  );
};

export default StaffDashboard;
