import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ViewCourseSideBar from '../compontnts/Dashboard/StudentDashboard/ViewCourseSideBar'
import { getFullCourseDetails } from '../services/operations/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../slices/courseSlice';


function ViewCourse() {
  
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseId }=useParams();
  useEffect(() => {
    async function getFullCourseData() {
      try {
        const result = await getFullCourseDetails({ courseId, token });
        console.log("full course data ", result);
        dispatch(setCourse(result));
      } catch (error) {
        console.error("Failed to fetch course data", error);
      }
    }

    getFullCourseData();
  }, [courseId, token, dispatch]);
   
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]  flex-col lg:flex-row p-5">
    <div className='bg-[#eeeef6] border-[5px]  border-[#F0F3F5] min-w-[300px]'>
    <ViewCourseSideBar />
    </div>
    <div className="flex-1 overflow-auto p-5 bg-[#eeeef6] border-[5px]  border-[#F0F3F5]">
      <div className="mx-auto w-full lg:w-11/12">
        <Outlet />
      </div>
    </div>
  </div>
  
  )
}

export default ViewCourse