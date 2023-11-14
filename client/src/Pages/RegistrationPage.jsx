import React, { useState } from 'react';
import Login from '../Component/Login';
import Register from '../Component/Register';

const RegistrationPage = () => {
  const [registrationType, setRegistrationType] = useState(null);

  const handleTypeSelection = (type) => {
    setRegistrationType(type);
  };

  return (
    <div className="container mx-auto h-full">
      <div className="flex justify-center mb-5">
        <button
          className="mr-4 px-4 py-2 bg-[#0F2355] text-white rounded hover:bg-blue-700 flex justify-center"
          onClick={() => handleTypeSelection('Login')}
        >
          Login
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 flex justify-center"
          onClick={() => handleTypeSelection('Register')}
        >
          SignUp
        </button>
      </div>
      
      {registrationType === 'Login' && <Login />}
      {registrationType === 'Register' && <Register/>}
      
    </div>
  );
};

export default RegistrationPage;
