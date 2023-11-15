import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, selectRegisteredUser, selectRegistrationError } from "../Redux/RegisterSlice";  // Add these imports
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const registeredUser = useSelector(selectRegisteredUser);
    const registrationError = useSelector(selectRegistrationError);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
   
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try{
            await dispatch(registerUser(formData));
            navigate('/Login')
        }catch(error){}
      
    }
  };

  return (
    <div className="border p-5 shadow-xl">
      <h2 className="text-2xl font-bold mb-5 flex justify-center"> SignUp</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="">
          <label
            htmlFor="first_name"
            className="block text-gray-700 font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`border ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-2">{errors.first_name}</p>
          )}
        </div>
        <div className="">
          <label
            htmlFor="last_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`border ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-2">{errors.last_name}</p>
          )}
        </div>
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
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className={`border ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3`}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirm_password}
            </p>
          )}
        </div>
        <div className="col-span-2">
            
          <button
            type="submit"
            className="bg-[#0F2355] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onSubmit={handleSubmit}
          >
            Register
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default Register;
