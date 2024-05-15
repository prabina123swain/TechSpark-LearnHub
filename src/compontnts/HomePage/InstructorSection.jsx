import React from 'react';
import instructor from "../../assets/Images1/instructor.png";
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection() {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center mt-20 mb-32'>
      <div className='w-full md:w-40%'>
        <img src={instructor} alt='instructor' className='max-h-[400px] md:max-h-full' />
      </div>
      <div className='w-full md:w-63%'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl p-4 mb-5'>
          Become <span className='text-[#e44325]'>an instructor</span>
        </h1>
        <p className='text-base md:text-lg lg:text-xl text-richblack-300 mb-10'>
          Becoming an instructor is a rewarding endeavor that involves sharing knowledge, inspiring
          others, and fostering a collaborative learning environment. As an instructor, you have the
          opportunity to guide individuals on their educational journey, helping them grasp complex
          concepts and develop practical skills.
        </p>
        <div>
        <Button linkto={"/login"}>Start Teaching Now <FaArrowRight /></Button>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
