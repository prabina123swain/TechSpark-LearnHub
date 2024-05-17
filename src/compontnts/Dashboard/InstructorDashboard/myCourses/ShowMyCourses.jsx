// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import CourseList from './CourseList';
import { useSelector } from 'react-redux';
import { deleteCourse, userCourses } from '../../../../services/operations/courseApi';
import {  useNavigate } from 'react-router-dom';


const ShowMyCourses = () => {
    //find all courses related to instructor
    const [allCourses,setAllCourses] = useState([]);
    const {token} =useSelector(state=>state.auth);
    // const {user} = useSelector(state=>state.profile);
    // const {course} = useSelector(state=>state.course);
    
    const navigate = useNavigate();


    //console.log("user",user);

  useEffect(()=>{
      
    async function findCourses(){
      // const courses=await user.courses.map(async(courseId)=>{
      //   console.log(courseId);
      //   return  await findCourseDetails({courseId,token});
      // })
      const result= await userCourses({token});
      console.log("courses ",result.courses);
       setAllCourses(result.courses);
     }
 
     findCourses();

     },[token]);

     const handleDelete = async(id) => {
      console.log(`Delete course with id ${id}`);
        const result= await deleteCourse({courseId:id,token});
        console.log("result ",result);
        if(result.success){
          setAllCourses(result.updatedCourses);
         }
    };
  
    
  return (
        <div className="container mx-auto mt-8">
        {
          (allCourses.length>0 )?(
            <div>
            <h1 className="text-2xl font-bold mb-4">Course List</h1>
             <ul>
            { allCourses.map((courseData,index) => (
             <li key={index} >
             <CourseList 
             courseData={courseData} 
             backgroundColor={(index%2)?"#E6FFEC":"#E6F7FF"}
             handleDelete={handleDelete}

              />
             </li>
            ))}
             </ul>
         </div>
          ):(
            <div className='w-full h-full flex flex-col justify-center items-center p-10'>
            <span className=' p-5 font-bold text-2xl text-richblack-600'>   No Courses Found</span>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
                onClick={()=>navigate("/dashboard/add-course")}
              >
                 click to add course
              </button>
            </div>
          )
        }
        
    </div>
  );
};

export default ShowMyCourses;
