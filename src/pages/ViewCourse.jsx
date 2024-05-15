import React from 'react'
import { Outlet } from 'react-router-dom'
import ViewCourseSideBar from '../compontnts/Dashboard/StudentDashboard/ViewCourseSideBar'

function ViewCourse() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]  flex-col lg:flex-row p-5">
    <ViewCourseSideBar />
    <div className="flex-1 overflow-auto p-5 bg-[#eeeef6] border-[5px]  border-[#F0F3F5]">
      <div className="mx-auto w-full lg:w-11/12">
        <Outlet />
      </div>
    </div>
  </div>
  
  )
}

export default ViewCourse