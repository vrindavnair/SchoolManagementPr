import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux-toolkit/authSlice';

const RegisterForm = ({ setBoxName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    try {
      const resultAction = await dispatch(registerUser({ email, password })).unwrap();
      console.log(resultAction);
      navigate('/');
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed: " + err);
    }
  };

  return (
    <form className="max-w-sm mx-auto p-6 bg-purple-600 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl text-white font-semibold text-center mb-6">Register</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input 
        type="password" 
        name="confirmPassword" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button 
        type="submit" 
        disabled={isLoading} 
        className={`w-full py-3 text-white font-semibold rounded-lg ${isLoading ? 'bg-purple-300' : 'bg-purple-200 text-purple-700 hover:bg-puple-600'} focus:outline-none`}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      <p className="mt-4 text-center">
        Already have an account? 
        <span 
          onClick={() => setBoxName('login')} 
          className="text-white hover:bg-blue-700 hover:text-white cursor-pointer"
        > 
          <i>Login</i>
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
