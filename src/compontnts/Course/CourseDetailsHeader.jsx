import React from 'react'
import manImage from '../../assets/Images/ManWithLaptop.png'
 import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BuyCourse } from '../../services/operations/PaymentProcess';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../slices/cartSlice';


function generateRandomNumber(min, max) {
    // Generate a random number between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min) + min);
  }

function CourseDetailsHeader({courseDetails}) {

  const {token} = useSelector((state)=>state.auth);
  const {user} =  useSelector((state) =>state.profile);
  console.log("type course" , courseDetails?.studentsEnrolled,user._id);

  // console.log("token ",token);
  // console.log("user" ,user) ;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
async function buyCourseHandler() {
  const courses= [courseDetails?._id];
  const user_details = user;
 // console.log("Hate ",token,"course",courses,user_details);
  const result= await BuyCourse({token,courses,user_details,navigate,dispatch});
  console.log("result of buy course ",result);
}

 function  addToCartHandler() {
    dispatch(addToCart(courseDetails));
 }
 


  return (
    <div className=' w-full mx-auto text-white flex justify-evenly relative'>
          {/* Left side */}
          <div className='w-full flex flex-col items-center justify-center min-h-[500px] h-auto'>
            {/* upper Framw */}
           <div className=' bg-gradient-to-tr from-[#111B38] via-[#111B38] to-blue-500 w-full pl-20 p-5 pt-10 pb-10'>
             {/* course title and desc */} 
             <div className=' lg:w-2/3 h-full flex flex-col space-y-3'>
             <div className='font-bold text-3xl'>
               {courseDetails?.courseName}
             </div>
             <div className='p-1 text-[#E0E0E0] font-light text-md'>
               {courseDetails?.courseDescription}
             </div>
             <div className='flex items-center space-x-6'>
               <div className='flex gap-1 items-center'>
                <FaStar style={{ color: 'yellow' }} ></FaStar>
                <FaStar style={{ color: 'yellow' }} ></FaStar>
                <FaStar style={{ color: 'yellow' }} ></FaStar>
                <FaStar style={{ color: 'yellow' }} ></FaStar>
                <FaStarHalfAlt style={{ color: 'yellow' }} ></FaStarHalfAlt>
                4.5+
               </div>
              <div className='space-x-2'> Published By:
               <span> {courseDetails?.instructor?.firstName}</span>
               <span>{courseDetails?.instructor?.lastName} </span>
               </div> 
             </div>
             <div  className="flex justify-left space-x-4 pt-5"> 
            {
             courseDetails?.studentsEnrolled.includes(user._id) ? (
                <Link  to={`/dashboard/enrolled-courses`}
                 className="bg-[#FF469F] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#111B38] hover:border hover:border-gray-500">
                  Go to my courses
                </Link>
              ):(
              <div className="flex justify-left space-x-4">
                <button
                  onClick={() => addToCartHandler()}
                  className="border border-gray-500 px-3 py-2 flex items-center rounded-md mr-4 hover:bg-[#FF469F] font-semibold"
                >
                  <FaRegHeart /> <span className="ml-1">WishList</span>
                </button>
                <button 
              onClick={()=>{buyCourseHandler()}}
              className="bg-[#FF469F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#111B38] hover:border hover:border-gray-500"
              >
              Buy Now
             </button>
             </div>
              )
             }
             </div>  
             </div>
           </div>
            {/* frame footer */}
            <div className='bg-[#F2EFF2] text-black w-full flex flex-col  justify-center pt-7 pb-7 '>
  <ul className='flex justify-evenly w-8/12 flex-wrap '>
    <li className='flex flex-col justify-center items-center p-2'>
      <p className='font-semibold text-3xl text-[#FF8E1C]'>
        {generateRandomNumber(15,30)}+
      </p>
      <p className='font-semibold text-richblack-600'>
        Total Assignment
      </p>
    </li>
    <li className='flex flex-col justify-center items-center p-2'>
      <p className='font-semibold text-3xl text-[#FF8E1C]'>
        {generateRandomNumber(180,300)}+
      </p>
      <p className='font-semibold text-richblack-600'>
        Problems Solved
      </p>
    </li>
    <li className='flex flex-col justify-center items-center p-2'>
      <p className='font-semibold text-3xl text-[#FF8E1C]'>
        {generateRandomNumber(99995,11000)}+
      </p>
      <p className='font-semibold text-richblack-600'>
        Students Enrolled
      </p>
    </li>
  </ul>
</div>

          </div>
           {/* right side */}
{/* Right side - Image (Hidden on medium and large devices) */}
<div className="hidden md:hidden lg:block absolute right-14 bottom-0 p-3 w-1/3 h-full">
  <img className="h-full w-full" src={manImage} alt="Man with Laptop" />
</div>

      </div>
  )
}

export default CourseDetailsHeader