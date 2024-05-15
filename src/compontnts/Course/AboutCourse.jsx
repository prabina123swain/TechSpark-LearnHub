import React from 'react';
import { FaCertificate, FaChalkboardTeacher, FaStar, FaRegHeart, FaQuestionCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BuyCourse } from '../../services/operations/PaymentProcess';
import { addToCart } from '../../slices/cartSlice';

function AboutCourse({ courseDetails }) {

  const {token}= useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function buyCourseHandler() {
    const courses= [courseDetails?._id];
    // console.log("type " ,typeof courseDetails?._id);
    const user_details = user;
   // console.log("Hate ",token,"course",courses,user_details);
    const result= await BuyCourse({token,courses,user_details,navigate});
    console.log("result of buy course ",result);
  }
  
   function  addToCartHandler() {
      dispatch(addToCart(courseDetails));
   }
   

  return (
    <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h3 className="text-xl font-bold text-[#FF469F]">About the Course</h3>
      <div className='w-10 h-1  bg-[#FF469F] mb-4'></div>
      <div className="flex flex-col sm:flex-row justify-between">
        {/* Left Side */}
        <div className="w-full sm:w-7/12 space-y-4">
          <h3 className="text-2xl font-bold mb-4 text-black">
            Covers pretty much everything you need to know about {courseDetails?.category.name}
          </h3>
          {/* Course Instructions */}
          <div className="mb-4">
            <p className="font-bold">Details:</p>
            <p className="text-[#615A63]">{courseDetails?.whatYouWillLearn}</p>
          </div>
          {/* What You'll Learn */}
          <div>
            <p className="font-bold">Course Instructions:</p>
            <ul className="list-disc list-inside text-pure-greys-500">
              {courseDetails?.instructions?.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
          {/* Tags */}
          <div className="mb-4">
            <p className="font-bold">Tags:</p>
            <div className="flex flex-wrap">
              {courseDetails?.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-blue-600 px-2 py-1 rounded-md -2 font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full sm:w-4/12 mt-4 sm:mt-0">
          {/* Additional Information */}
          <div>
            <h2 className="text-lg font-bold mb-2">Additional Information</h2>
            <div className="space-y-4">
              {/* Information Blocks */}
              {[
                { icon: FaCertificate, title: "Authentic Certificate", description: "Gain a certificate upon course completion" },
                { icon: FaChalkboardTeacher, title: "Online Classes", description: "Access the course from anywhere" },
                { icon: FaStar, title: "Beginners Level", description: "Suitable for beginners in the field" },
                { icon: FaQuestionCircle, title: "Doubt Support", description: "Get assistance with any queries" }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="text-blue-300 p-1 border w-6 h-6 border-blue-200 mr-2" />
                  <div>
                    <h3 className="text-md font-semibold">{item.title}</h3>
                    <p className="text-sm text-pure-greys-500">{item.description}</p>
                  </div>
                </div>
              ))}
              {/* Buttons */}
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
        </div>
      </div>
    </div>
  );
}

export default AboutCourse;
