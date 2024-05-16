// src/WelcomeCourse.js
import React from 'react';
import { useSelector } from 'react-redux';

function WelcomeCourse() {
   
    const {course} = useSelector((state)=>state.course);
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to the Course! </h1>
      <h1 className='text-4xl font-bold text-gray-900 mb-6'>{course?.courseName}</h1>
      <img src={course?.thumbnail} alt="Course" className="w-full max-w-lg rounded shadow-lg" />
    </div>
  );
}

export default WelcomeCourse;
