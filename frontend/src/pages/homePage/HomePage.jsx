import { useState } from 'react';
import LoginForm from '../../components/signUp/loginForm';
import RegisterForm from '../../components/SignUp/RegisterForm';
 

const HomePage = () => {
  const [boxName, setBoxName] = useState('login');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
      <h1 className="text-3xl font-semibold mt-10 text-center text-purple-500 ">
        Welcome to the School Management System
      </h1>
      
      {boxName === 'login' && <LoginForm setBoxName={setBoxName} />}
      {boxName === 'signup' && <RegisterForm setBoxName={setBoxName} />}
    </div>
  );
};

export default HomePage;
