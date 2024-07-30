import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';

function ResetPasswordToken() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [mailSent, setMailSent] = useState(false);

    function submitHandler(e) {
        e.preventDefault();
        // Call a function using dispatch which will help to create a token and send mail to corresponding user
        dispatch(getPasswordResetToken(email, setMailSent,dispatch));
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="bg-gradient-to-r from-black to-blue-500 to-orange-500 min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold">
                    {!mailSent ? (
                        <span>Reset Password</span>
                    ) : (
                        <span>Mail Sent</span>
                    )}
                </h2>
                <p className="text-sm text-gray-600 mb-5">
                    {!mailSent ? (
                        "Please enter your email address. We will send you a link to reset your password."
                    ) : (
                        `We have sent you a link for reset password. Please check your email ${email}`
                    )}
                </p>
                {!mailSent ? (
                    <span>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </span>
                ) : (
                    <></>
                )}

                {!mailSent ? (
                   <div className=' flex gap-10'>
                   <button
                        
                        className="mt-4 bg-richblack-200 text-black p-2 rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submitHandler}
                        className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                    >
                        Submit
                    </button>
                   </div>
                ) : (
                    <span className='flex gap-5'>
                        <button className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer">
                            <Link to="/login">Back to Login</Link>
                        </button>
                        <button className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer">
                            <span onClick={() => setMailSent(false)}>Resend Email</span>
                        </button>
                    </span>
                )}
            </div>
        </div>
    );
}

export default ResetPasswordToken;
