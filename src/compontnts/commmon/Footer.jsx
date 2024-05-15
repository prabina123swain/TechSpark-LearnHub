import React, { useState } from 'react'
import Button from '../HomePage/Button'
import TechSpark from "../../assets/Logo/TechSparkLogo.svg"
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialGoogle } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { SlSocialLinkedin } from "react-icons/sl";
import toast from 'react-hot-toast';


function Footer() {
    const {email,setEmail} = useState("");

    function clickHandler() {
      // e.preventDefault();
      console.log("Love you ");
       toast.success("Thank you for subscribing");
    }
  
  return (
    <div className='bg-black'>
     <div className='text-white w-11/12 mx-auto flex flex-col items-center font-medium pb-20'>
      <div className='text-white text-6xl pt-20 pb-16 flex flex-col items-center '>
       <h1>Subscribe & Get </h1> 
       <h1> The Latest Updates</h1>
      </div>
      <div className='flex gap-5 mb-10 pb-10'>
        <input  type='text' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
        className='min-w-[400px] w-auto h-16 rounded-full text-blue-900 text-3xl p-5' />
        <Button active={true} linkto={"/"} value={email} >Subscribe</Button>
      </div>
      <div className='w-[100%] border-[0.5px] border-solid divide-x-4 border-x-white mb-8'></div>
       <ul className='flex items-center justify-between gap-20 text-2xl font-bold '>
        <li className=''>
            <img src={TechSpark} width={100} height={100} alt='TeckSparkLogo'/>
        </li>
        <li className='hover:text-[red] hover:cursor-pointer'> About</li>
        <li className='hover:text-[red] hover:cursor-pointer'> Service</li>
        <li className='hover:text-[red] hover:cursor-pointer'> Career</li>
        <li className='hover:text-[red] hover:cursor-pointer'> Awards</li>
        <li className='hover:text-[red] hover:cursor-pointer'>Cotact </li>
        <li className='flex gap-1 hover:cursor-pointer'>
         <Link to={"https://www.facebook.com"}><SlSocialFacebook/></Link> 
         <Link to={"https://www.instagram.com"}><SlSocialInstagram/> </Link>
         <Link to={"https://www.twitter.com"}><SlSocialTwitter/></Link>
         <Link to={"https://www.google.com"}><SlSocialGoogle/> </Link>
        </li>
       </ul>
      <div className='w-[100%]  border-[0.5px] border-solid divide-x-4 border-x-white mt-9'></div>
      <div className='mt-10 font-semibold text-xl'>Thank You</div>
      <p className=' text-richblack-300'>This project By Prabina Swain , From  INDIA </p>
      <p className='text-richblack-300 flex items-center gap-3'>Contact me on<Link to={"https://www.linkedin.com/in/prabina-swain/"}><SlSocialLinkedin/></Link></p>
    </div>
    </div>
  )
}

export default Footer