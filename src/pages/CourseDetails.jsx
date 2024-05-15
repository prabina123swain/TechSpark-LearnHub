import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findCourseDetails } from '../services/operations/courseApi';


import Footer from '../compontnts/commmon/Footer';
import AboutCourse from '../compontnts/Course/AboutCourse';
import CourseInstructor from '../compontnts/Course/CourseInstructor';
import CourseDetailsHeader from '../compontnts/Course/CourseDetailsHeader';

function CourseDetails() {

  const {courseId}=useParams();
 // console.log(courseId);
  const [courseDetails,setCourseDetails] = useState(null);
  
  console.log("type " ,typeof courseId);
  
  useEffect(()=>{
    async function fetchCourseDetails(){
       const result=await findCourseDetails({courseId});
       //console.log("result",result);
       setCourseDetails(result);
    }
    fetchCourseDetails();
  },[courseId]);



  return (
    //add loading page
    <div className='space-y-10'>
      {/* Header  */}
     {
      courseDetails && <CourseDetailsHeader courseDetails={courseDetails}/>
     }

      {/* About course */}
      {
        courseDetails && <AboutCourse courseDetails={courseDetails}/>
      }
      
      {/* course instructor */}
      <div>
        {
          courseDetails && <CourseInstructor instructor={courseDetails.instructor}/>
        }
      </div>
      {/* footer */}
       <div>
        <Footer/>
       </div>
    </div>
  )
}

export default CourseDetails