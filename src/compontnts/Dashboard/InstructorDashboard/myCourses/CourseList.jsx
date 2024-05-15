// src/components/CourseList.js
import React, { useState } from 'react';
import ConfirmationModal from '../../../commmon/ConfirmationModal';

const CourseList = ({courseData,backgroundColor,handleDelete}) => {

   //console.log("course data",courseData);
  
  const handleEdit = () => {
    console.log(`Edit course with id courseData`,courseData);
  };


  const [confirmationModalData,setConfirmationModalData]=useState(null);
  return (
    <div
    className="flex p-4 border border-gray-300 mb-4 rounded"
    style={{ backgroundColor: backgroundColor }}>
          <img
              src={courseData?.thumbnail}
              alt="Course"
              className="h-32 w-48 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <div className="mb-2">
                <span className="font-bold text-lg">{courseData?.courseName}</span>
                <p className="text-sm text-gray-600">{`Price: ${courseData?.price} | Created At: ${(courseData?.createdAt)}`}</p>
              </div>
              <p className="text-sm text-gray-700">{courseData?.courseDescription}</p>
            </div>
            <div className="flex flex-col justify-between ml-4">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mb-2"
                onClick={() => handleEdit()}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-black px-2 py-1 rounded hover:bg-red-700"
                onClick={()=>{
                  setConfirmationModalData({
                    text1:`Are you sure delete course '${courseData?.courseName}' ?`,
                    text2:`Once deleted all lectures and course deteils will deleted !`,
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDelete(courseData?._id),
                    btn2Handler: () => setConfirmationModalData(null),
                  })
                }}
              >
                Delete
              </button>
            </div>
            {
              confirmationModalData &&
              <ConfirmationModal modalData={confirmationModalData}/>
            }
    </div>
  );
};

export default CourseList;
