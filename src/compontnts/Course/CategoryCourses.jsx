import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { categoryPageDetails } from '../../services/operations/CategoryPageData'
import ConfirmationModal from '../commmon/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../commmon/Loader';
import { hideLoading, showLoading } from '../../slices/loadingSlice';

function CategoryCourses({categoryId}) {
        //find all courses of that category
        const [currentCategoryCourses,setCurrentCategoryCourses]=useState([]);
        // const [otherCategoryCourses,setOtherCategoryCourses]=useState([]);
         const [topSellingCategoryCourses,setTopsellingCategoryCourses]=useState([]);
        
         const dispatch = useDispatch();
       
  useEffect(() => {
      async function findCategoryData(categoryId) {
       // console.log("ID-",categoryId);
        dispatch(showLoading());
        const result=await categoryPageDetails(categoryId);
        //console.log("Category Page Data  ",result);
        setCurrentCategoryCourses(result.categoryCourses);
        //setOtherCategoryCourses(result.otherCategories);
        setTopsellingCategoryCourses(result.topSellingCourses);
        dispatch(hideLoading());
        console.log("current category courses ",currentCategoryCourses);
        //console.log("other category courses ",otherCategoryCourses);
        console.log("topSelling category courses ",topSellingCategoryCourses);
      }
    findCategoryData(categoryId);
  },[categoryId]);

  const [showModal, setShowModal] = useState(false);

  const confirmationModelData = {
    text1: `Log in required '?`,
    text2: "Course details will visible after log in.",
    btn1Text: "Login",
    btn2Text: "Cancel",
    btn1Handler: () => {
      // Redirect to the login page
        window.location.href = "/login"; 
    },
    btn2Handler: () => setShowModal(false),
  }

  return (
    <div className='w-11/12 mx-auto'> 
        <div className='mb-14 mt-10'>
          {
            currentCategoryCourses.length>0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
               {  
                currentCategoryCourses.map((course,index)=> (
                  <CourseCard courseDetails={course} key={index} showModal={showModal} setShowModal={setShowModal}/>

               )) 
             }
             </div>
            ) : (
              <div className='font-bold text-3xl w-full p-10 flex justify-center items-center'> NO COURSES IN THIS CATEGORY </div>
            )
          }
         </div>
       <h2 className='text-2xl font-bold p-5'>Highly Recomendend Courses/ Top Selling Courses</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
        {  
          topSellingCategoryCourses.map((course,index)=> (
            <CourseCard courseDetails={course} key={index} showModal={showModal} setShowModal={setShowModal}/>
          ))
        }
       </div>
       {
        showModal && <ConfirmationModal modalData={confirmationModelData}/>
       }
    </div>
  )
}

export default CategoryCourses