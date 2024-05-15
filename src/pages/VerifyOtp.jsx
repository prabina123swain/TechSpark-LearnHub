import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const dispatch =  useDispatch();
  const {loading}=useSelector(state=>state.auth);
  const {signUpData} = useSelector(state=>state.auth);
  //console.log("Sign up data ",signUpData);
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    dispatch(signUp(signUpData,{otp,navigate}));
    console.log('Verifying OTP:', otp);
  };

  return (
    <div>
    {
        (loading)?(
        <div className='flex justify-center items-center text-6xl'>Loading...</div>
      ):(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-sm text-richblack-500 mb-6">
          An OTP has been sent to your email for verification. Please enter the code below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-semibold mb-2">
              OTP Code
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNUm={true}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-2 text-xl text-blue-800 border-richblack-900  rounded-md aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
      )

    }

    </div>
  );
};

export default VerifyOTP;
