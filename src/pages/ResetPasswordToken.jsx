import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from '../services/operations/authApi'

function ResetPasswordToken() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [mailSent, setmailSent] = useState(false);

    function submitHandler(e) {
        e.preventDefault();
        //call a function using dispatch which will help to create a token and send mail to correspoding user
        dispatch(getPasswordResetToken(email,setmailSent));
    }

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold ">
      {
        !mailSent?(<span>Reset Password</span>):(<span>Mail Sent</span>)
      }
      </h2>
      <p className="text-sm text-gray-600 mb-5">
       {
        !mailSent?(     
          "Please enter your email address. We will send you a link to reset your password.")
          :(` We have sent you a link for reset password please check your email ${email}`)
       }  
       </p>
      {
        !mailSent ?(
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
        ):(<></>)
      }

    {!mailSent ?(      
      <button onClick={submitHandler}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer">
        Submit </button>)
        :(<span className='flex gap-5'>
           <button  className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
           ><Link to={"/login"}>Back to Login</Link></button> 
            <button  className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
            ><span  onClick={()=>setmailSent(false)}>Resend Email</span></button>
        </span>
        )
        }
    </div>
  </div>
  )
}

export default ResetPasswordToken