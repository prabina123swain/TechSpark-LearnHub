import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../HomePage/Button';
import { useState , useEffect} from 'react';
import { studentCourses } from '../../../services/operations/courseApi';
import MyCourseCard from './MyCourseCard';
import { hideLoading, showLoading } from '../../../slices/loadingSlice';

function EnrolledCourses() {
  
  const [courses,setCourses] = useState([]);
  const {token} = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    
    async function findCourses() {
     // dispatch(showLoading());
      const result = await studentCourses({ token,dispatch });
      dispatch(hideLoading());
      //console.log("courses ", result.courses);
      setCourses(result.courses);
    }

    findCourses();
  }, [token]);

  if(courses.length===0){
    return(
      <div className='flex flex-col justify-center items-center h-full w-full font-bold mt-20 text-2xl'>
        <p className='p-10'>No courses enrolled </p> 
        <Button>Add a new course</Button>
      </div>
    )
  }

 // src/App.js
  // const courses = user?.courses;
  // console.log("courses", courses);
  return (
    <div className="flex flex-col items-center">
    <div className='flex flex-col items-center pl-4 pr-4 pb-2 pt-2 bg-white rounded-md border-2 border-blue-100 m-5 italic'>
    <h2 className='text-2xl font-bold text-richblack-600 font-inter '>Your Courses</h2>
    <p className='text-sm text-richblack-200'>All enrolled courses</p>
    </div>
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
        {courses.map((course,index) => (
          <MyCourseCard
            key={index}
            courseDetails={course}
          />
        ))}
      </div>
    </div>
  );

}

export default EnrolledCourses