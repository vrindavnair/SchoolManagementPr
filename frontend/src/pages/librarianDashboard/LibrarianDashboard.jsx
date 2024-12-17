import { useNavigate } from 'react-router-dom';
import LibraryForm from '../../components/LibraryBook/LibraryForm';

const LibrarianDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-fuchsia-500 to-violet-600 p-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-semibold">Librarian Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/students')} 
            className=" text-white py-2 px-4 rounded"
          >
            Students Details
          </button>
          <button 
            onClick={() => navigate('/library')} 
            className="text-white py-2 px-4 rounded"
          >
            Library History
          </button>
          <button 
            className=" text-white py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <LibraryForm />
    </div>
  );
};

export default LibrarianDashboard;
