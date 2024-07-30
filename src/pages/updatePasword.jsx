// src/components/UpdatePasswordForm.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaCheck , FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../services/operations/authApi';
import { hideLoading, showLoading } from '../slices/loadingSlice';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword,setShowPassword] = useState(false);
 // const [waitTime , setWaitTime] = useState(Date.now);
  const dispatch=useDispatch();
  const location= useLocation();
  const navigate =useNavigate();

  const calculatePasswordStrength = (password) => {
    // Simple password strength criteria (you can adjust these based on your requirements)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    // Calculate strength based on criteria
    if (isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      return 'Strong';
    } else if (isLengthValid && (hasUppercase || hasLowercase || hasNumber)) {
      return 'Moderate';
    } else {
      return 'Weak';
    }
  };

  const handlePasswordChange = (value) => {
    setNewPassword(value);
    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not matched');
      return;
    }
    dispatch(showLoading());
    const token =location.pathname.split('/').at(-1);
    //  logic to update the password
    //console.log(newPassword,confirmPassword ,token);
   const result= dispatch(updatePassword({newPassword,confirmPassword,token}))
    // For now, just log the new password to the console
    //console.log('result of update Password:', result);   
    // Reset form state
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setPasswordStrength('');
    const timer = setTimeout(() => {
      dispatch(hideLoading());
      navigate('/login');
  }, 2000);
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-500 to-orange-500 min-h-screen flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Update Password</h2>

        {error && (
          <p className="text-red-500 mb-6 bg-red-100 border border-red-400 text-sm p-2 rounded">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 text-sm font-bold mb-2 relative"
          >
            New Password
       
          <input
            type={showPassword?"password":"text" }
            id="newPassword"
            placeholder="Enter new password"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
           <span className='absolute top-[50%] right-5 ' onClick={()=>setShowPassword(!showPassword)}>
            {
            !showPassword?(
            <FaRegEye color='blue' size={'20px'} />)
            :(<FaRegEyeSlash color='blue' size={'20px'} />)
            }
            </span>
         </label>
        </div>

        <div className="mb-2 text-sm text-gray-700 flex items-center gap-1">
          {passwordStrength === 'Weak' && (
            <FaCheck color='red' />
          )}
          {passwordStrength === 'Moderate' && (
            <FaCheck color='yellow' />
          )}
          {passwordStrength === 'Strong' && (
            <FaCheck color='green'/>
          )}
          {passwordStrength}
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
         
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            className="shadow border rounded w-full py-2 px-3 text-pure-greys-700 leading-tight focus:outline-none focus:shadow-outline"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
           </label>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
