// // Login.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../Redux/LoginSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};
//   if (!formData.email.trim()) {
//     newErrors.email = "Email is required";
//     isValid = false;
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
//     newErrors.email = "Invalid email format";
//     isValid = false;
//   }
//   setErrors(newErrors);
//   return isValid;
//   }

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const { email, password } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try{await dispatch(loginUser(formData));
//     //     navigate('/')
//     // }catch(error){
//     //     if(error === 'Email not found'){}
//     // }

//     if (validateForm()) {
//         try{
//             await dispatch(loginUser(formData));
//             navigate('/')
//         }catch(error){}
      
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border rounded shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>
//         <div className="col-span-2">
//           <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`border ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             } rounded w-full py-2 px-3`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-2">{errors.email}</p>
//           )}
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
        
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//           onSubmit={handleSubmit}
//         >
//           Login
//         </button>
        
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/LoginSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(loginUser(formData));
        navigate('/');
      } catch (error) {
        // Handle login error, if needed
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="col-span-2">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default Login;
