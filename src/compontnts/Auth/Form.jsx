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
  
  //const {signUpData} =useSelector(state=>state.auth);
  //console.log("sign up data ",signUpData,loading);
 // console.log(formType);
  const [formData, setFormData] = useState({
  })

  
function changeHandler(event){
  //console.log("event",event);
  const{name,value}=event.target
 // console.log("Form data",formData);
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
        // else if(password.length<8)
        // {
        //   toast.error("Password length must be atleast 8 ");
        //   return;
        // }
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
        <input
          required
          type={!showPassword && data.name==="password" ?data.type:"text"}
          name={data.name}
          value={data.value}
          onChange={changeHandler}
          placeholder={data.placeholder}
          className="form-style w-full text-black rounded-md p-2 text-md lg:min-w-[300px] border-2 border-richblue-300"
        />
     { 
       (data.name==="password")?(
      <span  className="absolute right-3 top-[60%] z-[10] cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <FiEye fontSize={24} color='black' />
          ) : (
            <FiEyeOff fontSize={24} color='black' />
          )}
          </span>
        ):(<></>)}
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
