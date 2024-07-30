import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

export default function Section2({ position, code }) {
  return (
    <div className={`flex ${position} flex-col lg:flex-row w-11/12 mx-auto  justify-between gap-10 h-auto`}>
      <div className='h-fit flex text-sm bg-[#1d1d1e] text-blue-200 shadow-xl rounded-md w-full lg:w-1/2 p-4 lg:pr-10 lg:pt-3 lg:pl-3 lg:pb-3'>
        <div className='w-[10%] text-richblack-500 font-inter font-bold text-base lg:text-xl'>
          <p>01</p>
          <p>02</p>
          <p>03</p>
          <p>04</p>
          <p>05</p>
          <p>06</p>
          <p>07</p>
          <p>08</p>
          <p>09</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className='w-[90%] flex flex-col font-bold font-mono text-base lg:text-xl pr-2'>
          <TypeAnimation
            sequence={[code, 1000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block"
            }}
          />
        </div>
      </div>
      <div className='w-full lg:w-1/2 flex flex-col gap-5 text-richblack-900 items-center'>
        <h1 className='text-3xl lg:text-5xl overflow-hidden p-2 text-center lg:text-left'>
          Start <span className="text-[#e44325]">coding in second</span>
        </h1>
        <p className='text-richblack-300 text-base lg:text-lg text-center lg:text-left'>
          Embarking on the journey of coding opens doors to a realm of problem-solving and creativity.
          As you delve into the world of programming, you not only acquire valuable technical skills 
          but also foster a mindset that encourages innovation and logical thinking.
        </p>
        <div className='flex gap-5'>
          <Button active={true} linkto={"/courses"}>Try Now <FaArrowRight /></Button>
        </div>
      </div>
    </div>
  )
}
