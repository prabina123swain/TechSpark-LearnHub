import React, { useState } from 'react'
import TechSpark from "../../assets/Logo/TechSparkLogo.svg"
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialGoogle } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { SlSocialLinkedin } from "react-icons/sl";
import toast from 'react-hot-toast';

function Footer() {
  const [email, setEmail] = useState('');

  const clickHandler = () => {
    if (email) {
      toast.success(`Subscribed with email: ${email}`);
      setEmail(''); // Reset the input field
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <div className='bg-black'>
      <div className='text-white w-11/12 mx-auto flex flex-col items-center font-medium pb-20'>
        <div className='text-white text-4xl sm:text-5xl md:text-6xl pt-20 pb-16 flex flex-col items-center'>
          <h1>Subscribe & Get</h1>
          <h1>The Latest Updates</h1>
        </div>
        <div className='flex flex-col sm:flex-row gap-5 mb-10 pb-10 items-center'>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full sm:min-w-[300px] md:min-w-[400px] h-12 sm:h-16 rounded-full text-blue-900 text-lg sm:text-2xl md:text-3xl p-5'
            placeholder='Enter your email'
          />
          <button
            className='text-center text-sm sm:text-lg px-4 py-2 sm:py-4 rounded-md font-mono hover:scale-95 transition-all duration-200 font-semibold leading-5 flex items-center bg-[#fd4a18] text-white hover:bg-[#fdfbfc] hover:text-[#fd4a18]'
            onClick={clickHandler}
          >
            Subscribe
          </button>
        </div>
        <div className='w-full border-t border-gray-500 mb-8'></div>
        <ul className='flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-10 md:gap-20 text-sm sm:text-xl md:text-2xl font-bold text-center'>
          <li>
            <img src={TechSpark} width={100} height={100} alt='TechSparkLogo' />
          </li>
          <li className='hover:text-red-500 cursor-pointer'>About</li>
          <li className='hover:text-red-500 cursor-pointer'>Service</li>
          <li className='hover:text-red-500 cursor-pointer'>Career</li>
          <li className='hover:text-red-500 cursor-pointer'>Awards</li>
          <li className='hover:text-red-500 cursor-pointer'>Contact</li>
          <li className='flex gap-3 sm:gap-1 hover:cursor-pointer'>
            <Link to={"https://www.facebook.com"}><SlSocialFacebook /></Link>
            <Link to={"https://www.instagram.com"}><SlSocialInstagram /></Link>
            <Link to={"https://www.twitter.com"}><SlSocialTwitter /></Link>
            <Link to={"https://www.google.com"}><SlSocialGoogle /></Link>
          </li>
        </ul>
        <div className='w-full border-t border-gray-500 mt-9'></div>
        <div className='mt-10 font-semibold text-lg sm:text-xl'>Thank You</div>
        <p className='text-richblack-300 text-center'>This project by Prabina Swain, from INDIA</p>
        <p className='text-richblack-300 text-center flex items-center gap-3'>Contact me on <Link to={"https://www.linkedin.com/in/prabina-swain/"}><SlSocialLinkedin /></Link></p>
      </div>
    </div>
  )
}

export default Footer;
