import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux-toolkit/authSlice';

const LoginForm = ({ setBoxName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, user } = useSelector((state) => state.auth);
  const role = user?.role;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'staff') {
          navigate('/staff');
        } else if (role === 'librarian') {
          navigate('/librarian');
        } else {
          alert('Invalid role detected');
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <form
      className="flex flex-col bg-purple-900 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`p-3 rounded bg-purple-200 text-purple-600 font-bold  ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className="mt-4 text-purple-300">
        Don't have an account?{' '}
        <span
          onClick={() => setBoxName('signup')}
          className="text-white hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
