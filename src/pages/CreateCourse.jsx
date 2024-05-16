import React from 'react'
import CreateCourseForm from '../compontnts/Dashboard/InstructorDashboard/addCourse/CreateCourseForm'
import { useSelector } from 'react-redux'
import SectionOfCourse from '../compontnts/Dashboard/InstructorDashboard/addCourse/SectionOfCourse';


function CreateCourse() {
  const {step}=useSelector(state=>state.course);

  return (
    <div className='flex bg-white p-3 flex-col  mx-auto items-center'>
        {
          step===1 &&     
         <div className='flex  flex-col justify-center items-center'>
          <div className='flex pl-4 pr-4 flex-col mt-3 items-center p-2 w-fit mb-8 bg-white rounded-md border-2  border-blue-100'>
           <h2 className='text-2xl font-bold text-richblack-600 font-inter'>Add Course</h2>
           <p className='text-sm text-richblack-200'>Add new course to help students</p>
          </div>
          <div>
          <CreateCourseForm/>
          </div>
         </div>
        }
        {
          step===2 && 
          <div className='p-5 w-full'>
          <div className='flex justify-center items-center'>
          <div className='flex w-fit mx-auto justify-center flex-col  items-center pl-6 pr-6 pt-1 pb-1 mb-8 bg-white rounded-md border-2  border-blue-100'>
           <h2 className='text-2xl font-bold text-richblack-600 w-fit font-inter'>Add Section</h2>
           <p className='text-sm text-richblack-200'>Add  course components</p>
          </div>
          </div>
          <div className='w-10/12 mx-auto'>
            <SectionOfCourse/>
          </div>
          </div>
        }
    </div>
  )
}

export default CreateCourse