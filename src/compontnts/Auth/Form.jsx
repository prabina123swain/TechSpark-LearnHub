import React from 'react';
import { useState } from 'react';
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import {  setSignUpData } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logIn, sendOTP } from '../../services/operations/authApi';
import { Link } from 'react-router-dom';
import imageUrl from '../../assets/Images1/loginimage.jpg'
import sideImg from '../../assets/Images1/Man Study Image.webp'
import { FaCheck } from 'react-icons/fa';


const tabData = [
  {
    id: 1,
    tabName: "Student",
    type: "Student",
  },
  {
    id: 2,
    tabName: "Instructor",
    type: "Instructor",
  },
]



export default function Form({inputData , formType}) {
  const navigate = useNavigate("/verifyOtp");
  const dispatch = useDispatch();
  const [showPassword,setShowPassword] = useState(false)
  const [accountType,setAccountType] = useState("Student");
  const [passwordStrength , setPasswordStrength ] = useState("week");
  //const {signUpData} =useSelector(state=>state.auth);
  //console.log("sign up data ",signUpData,loading);
 // console.log(formType);
  const [formData, setFormData] = useState({
  })

  const calculatePasswordStrength = (password) => {
    // Simple password strength criteria (you can adjust these based on your requirements)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

     let strength;
    // Calculate strength based on criteria
    if (isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      strength =  'Strong';
    } else if (isLengthValid && (hasUppercase || hasLowercase) && (hasNumber || hasSpecialChar) ) {
      strength = 'Moderate';
    } else {
       strength =  'Weak';
    }

    setPasswordStrength(strength);

  };
  
  
function changeHandler(event){
  //console.log("event",event);
  const{name,value}=event.target
 // console.log("Form data",formData);
  if(name=="password") {
    calculatePasswordStrength(value);
  }
  setFormData(prevData=>{
    return{
        ...prevData,
        [name]:value
     }
    } )
  }

  function submitHandler(e){
    e.preventDefault();
    const {email,password , confirmPassword }=formData
    // console.log("Account type ",accountType);
      if(formType==="signUp"){
        if(password!==confirmPassword)
        {
          toast.error("Password does not matched ");
          return;
        }
        else if(passwordStrength==="Weak")
        {
          toast.error("Password must be strong/moderate ");
          return;
        }
      const signUpData={
          ...formData,
          accountType
        }
        //dispatch all data to redux store 
        dispatch(setSignUpData(signUpData));
        //dispatch for sent otp to mail and navigate to verifyOtp page send otp function is in service/operations/auth folder 
        dispatch(sendOTP({email,navigate}));
        setAccountType("Student");
      }
      else{
        //for login handler
        //console.log("email and Pass",email,password);
        dispatch(logIn({email,password,navigate}));
      }
      //e.target.reset(); 
  }

  return (
    
   <div  className='w-11/12 mx-auto bg-white flex rounded-md justify-center  gap-20 p-12'>
    <div className=' flex flex-col items-center justify-center'>
    {formType === "signUp" && (
        <div className="relative rounded-full shadow-inner bg-gray-100 flex pb-1 mb-6 gap-x-1">
          {tabData.map((tab) => (
            <button
            key={tab.id}
            onClick={() => setAccountType(tab.type)}
            className={`py-2 px-8 rounded-full transition-all duration-300 ${
              accountType === tab.type
                ? "bg-blue-200 text-black font-bold"
                : "bg-transparent bg-blue-50 text-richblack-800 cursor-not-allowed"
            }`}
            
          >
            {tab.tabName}
          </button>
          ))}
        </div>
      )}

      <form className='flex flex-col gap-4 ' onSubmit={submitHandler}>
       {
        inputData.map((data,index)=>(
        <label className="relative" key={index}>
        <p className="mb-1 text-lg font-inter  leading-[1.375rem] ">
          {data.levelFor}<sup className="text-pink-200">*</sup>
        </p>
        <div className="relative">
  <input
    required
    type={!showPassword && data.name === "password" ? data.type : "text"}
    name={data.name}
    value={data.value}
    onChange={changeHandler}
    placeholder={data.placeholder}
    className="form-style w-full text-black rounded-md p-2 text-md lg:min-w-[300px] border-2 border-richblue-300"
  />
  {data.name === "password" && (
    <span
      className="absolute right-3 top-4 transform -translate-y-1/2 flex items-center z-[10] cursor-pointer"
      onClick={() => setShowPassword(prev => !prev)}
    >
      {showPassword ? (
        <FiEye fontSize={24} color='black' />
      ) : (
        <FiEyeOff fontSize={24} color='black' />
      )}
    </span>
  )}
  {data.name === "password" && formType === "signUp" && (
    <div className='flex flex-col gap-2 mt-2'>
      <div className="text-sm text-gray-700 flex items-center gap-1">
        {passwordStrength === 'Weak' && <FaCheck color='red' />}
        {passwordStrength === 'Moderate' && <FaCheck color='yellow' />}
        {passwordStrength === 'Strong' && <FaCheck color='green' />}
        {passwordStrength}
      </div>
      {/* <span className='text-sm text-gray-700 opacity-60'>
        Password must contain at least 8 characters with at least one digit, one uppercase letter, one lowercase letter, and one special character.
      </span> */}
    </div>
    )}
     </div>

      </label>
        ))
       }
       <button
        type="submit"
        className="rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium
         text-richblack-900 mt-6 hover:scale-95 transition-all duration-200">
        {formType}
      </button>
      { 
        (formType !== "signUp") &&
       <Link to={"/reset-password"}>    
       <span className='text-richblack-200 italic text-lg'>Reset password</span>
      </Link>
     }
     </form>
  </div>
  <div className='hidden md:flex md:w-1/2 p-4 flex-col items-center justify-center'>
  {
    (formType === "signUp") ? 
      (<img src={sideImg} alt='signUpImg' loading='lazy' className='w-full h-auto max-h-[600px] rounded-lg' />)
    : 
      (<img src={imageUrl} alt='LogInImg' loading='lazy' className='w-full h-auto max-h-[600px] rounded-lg' />) 
  }
  </div>

    </div>
  )
}
