import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StudentsForm from '../../components/Students/StudentsForm';

const AdminDashboardNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  const handleLogout = () => {
    navigate('/'); 
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/staff')} 
            className="  text-white py-2 px-4 rounded"
          >
            STAFFS
          </button>
          <button 
            onClick={() => navigate('/librarian')} 
            className="  text-white py-2 px-4 rounded"
          >
          LIBRARIAN 
          </button>

          {/* Dropdown for History */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown} 
              className="  text-white py-2 px-4 rounded"
            >
             HISTORY
            </button>
            {showDropdown && (
              <div className="absolute bg-white text-black shadow-lg rounded mt-2 py-2 w-48">
                <button 
                  onClick={() => navigate('/students')} 
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Students Details
                </button>
                <button 
                  onClick={() => navigate('/library')} 
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Library History
                </button>
                <button 
                  onClick={() => navigate('/fees')} 
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Fees History
                </button>
              </div>
            )}
          </div>

          <button 
            className="hover:bg-red-700 text-white py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <StudentsForm />
    </div>
  );
};

export default AdminDashboardNavbar;
