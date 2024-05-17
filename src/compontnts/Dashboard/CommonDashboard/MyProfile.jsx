import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const navigate = useNavigate();

  const {user} = useSelector(state=>state.profile);
   const profileInfo = [
    {
      title:"Name",
      val:user?.firstName +" "+ user?.lastName
    },
    {
      title: "Email",
      val: user?.email
    },
    {
      title: "Gender" ,
      val:  user?.additionalDetails?.gender
    },
    {
      title: "Date of Birth",
      val: user?.additionalDetails?.dateOfBirth
    },
    {
      title: "About",
      val:   user.additionalDetails?.about
      }

  ]

  return (
    <div className='flex w-11/12 mx-auto flex-col justify-center p-5 items-center gap-10 italic'>
    <div className='flex flex-col items-center p-2 bg-white rounded-md border-2 border-blue-100'>
    <h2 className='text-2xl font-bold text-richblack-600 font-inter'>My Profile</h2>
    <p className='text-sm text-richblack-200'>Details about your personal information</p>
    </div>
    {/* update profile pic section */}
    <div className='flex bg-white p-5 w-11/12 gap-5 items-center justify-between rounded-md'>
     <div className='flex gap-5 items-center'>
     <img  src={user?.image} alt='myprofile' className='w-20 h-20 rounded-full'></img>
     
    <p className='text-2xl font-bold'>{user.firstName} {user.lastName} <br/>
    <span className='text-sm text-richblack-200 font-normal'>Profile pic</span></p> 
     </div>
     <button className='p-3 rounded-lg lg:mr-6 text-lg font-semibold border-2 border-blue-100 hover:bg-blue-100 hover:text-white'
      onClick={()=>navigate("/dashboard/setting")}>
      update
     </button>
    </div>

   {/* additional information */}
    <div className='flex bg-white p-10 w-11/12  flex-col'>
    <h2 className='text-2xl font-bold text-richblack-600 mb-6 font-inter'>Additional information</h2>

  <div className=''>      
  {
      profileInfo.map((info,index)=>(
        <div key={index}>
        <div className='grid grid-cols-2 p-3'>
        <span className='font-bold mr-28'>{info.title}</span>
        <span className="text-sm font-medium text-black">
          {info.val}
        </span>
        </div>
        <div className='w-full h-[0.5px] bg-blue-100'></div>
        </div>
      ))
     }
    </div>
     <button className='p-3 rounded-lg lg:mr-6 text-lg font-semibold border-2 m-10 border-blue-100 hover:bg-blue-100 hover:text-white'
     onClick={()=>navigate("/dashboard/setting")}>   
        Update Details
     </button>
    </div>
    </div>
  )
}
