import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); // State to store the email input
  const [message, setMessage] = useState(''); // State to display success message
  const [error, setError] = useState(''); // State to display error message
  const navigate = useNavigate(); // Hook for navigating to other routes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://movie-backend-1-s3at.onrender.com/user/forgot-password', { email });
      setMessage(response.data.msg); // Display success message
      navigate('/login'); // Redirect to login page after successful request
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError(err.response.data.msg || 'Something went wrong'); // Display error message if request fails
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-[url('/src/assets/images/backgroundImage.jpg')] bg-cover bg-center">
      {/* Container with responsive width */}
      <div className='flex justify-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-auto border-2 border-gray-600 rounded-xl bg-gray-400'>
        <div className='w-full p-4'>
          {/* Title */}
          <h2 className='text-center font-bold text-xl sm:text-2xl md:text-3xl p-4'>Forgot Password</h2>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className='p-2 flex justify-center'>
              {/* Email input field */}
              <input
                type="email"
                id="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
                className='border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400'
              />
            </div>
            <div className='p-2 flex justify-center'>
              {/* Submit button */}
              <button className="w-full md:w-96 h-12 rounded-full bg-green-400 font-bold text-pink-500 p-2 hover:bg-green-500" type="submit">
                SEND EMAIL
              </button>
            </div>
          </form>

          {/* Success or error message */}
          {message && <div className='p-2 text-center text-md text-green-600'>{message}</div>}
          {error && <div className='p-2 text-center text-md text-red-600'>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
