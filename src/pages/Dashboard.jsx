import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../compontnts/Dashboard/CommonDashboard/Sidebar'
import { useSelector } from 'react-redux'

export default function Dashboard() {

    const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
    <Sidebar />
    <div className="flex-1 overflow-auto bg-[#eeeef6] border-[20px] border-[#F0F3F5]">
      <div className="mx-auto w-full">
        <Outlet />
      </div>
    </div>
  </div>
  
  )
}