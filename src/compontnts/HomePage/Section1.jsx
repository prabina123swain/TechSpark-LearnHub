import React from 'react';
import study_image from "../../assets/Images1/study_image.png";
import circle from "../../assets/Images1/1-Rotate image.png";
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';

export default function Section1() {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-3 items-center h-[100vh] pt-14'>
      <div className='w-full md:w-2/5 flex flex-col gap-5'>
        <p className="text-3xl md:text-6xl font-semibold overflow-hidden">
          Discover Your Profession, Forge Your Path
        </p>
        <p className='mb-8 text-richblack-300 text-base md:text-lg'>
          Embark on a transformative experience as you delve into the world of continuous learning,
          where each lesson becomes a stepping stone toward personal and professional growth.
        </p>
        <div className='flex flex-col md:flex-row gap-5'>
          <Button active={false} linkto={"/courses"}>
            Start Learning <FaArrowRight />
          </Button>
          <Button active={true} linkto={"/about"}>
            Learn More <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className='relative w-[40%] h-full'>
        <img  src={study_image}  alt='study' className='absolute  right-[-10px] bg-cover place-content-baseline' />
        <img  src={circle}  alt='circle' className='ml-[-110px] '/>
       </div>
    </div>
  );
}
