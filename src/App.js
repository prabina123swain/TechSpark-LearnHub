import { Routes,Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./compontnts/commmon/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPasswordToken";
import UpdatePassword from "./pages/updatePasword";
import VerifyOtp from "./pages/VerifyOtp";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactUs";
import Error from "./compontnts/commmon/Error";
import OpenRoute from "./compontnts/Auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./compontnts/Auth/PrivateRoute";
import MyProfile from "./compontnts/Dashboard/CommonDashboard/MyProfile";
import Setting from "./compontnts/Dashboard/CommonDashboard/Setting";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./compontnts/Dashboard/StudentDashboard/EnrolledCourses";
import Cart from "./compontnts/Dashboard/StudentDashboard/Cart";
import PurchaseHistory from "./compontnts/Dashboard/StudentDashboard/PurchaseHistory";
import CreateCourse from "./compontnts/Dashboard/InstructorDashboard/addCourse/CreateCourse";
import ShowMyCourses from "./compontnts/Dashboard/InstructorDashboard/myCourses/ShowMyCourses";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./compontnts/Dashboard/StudentDashboard/VideoDetails";

function App() {
  const {user} = useSelector(state=>state.profile);

  return (
    <div className="overflow-x-hidden  min-h-screen">
      <div className='bg-[#f3f3f3] '>
       <Navbar/>
      </div>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Error/>} />
        <Route path="reset-password" element={<ResetPassword/>} />
        <Route path="reset-password/:id" element={<UpdatePassword/>} />
        <Route path="verifyOtp" element={<VerifyOtp/>} />
        <Route path="about" element={<AboutPage/>} />
        <Route path="Contact" element={<ContactPage/>} />
        <Route path="courses" element ={<Courses/>} />

        <Route path="courses/:courseId"
          element={
            <PrivateRoute>
              <CourseDetails/>
            </PrivateRoute>
          }
        />

        {/* open routes for all users untill the login to system  */}
        <Route path="login"
         element={
          <OpenRoute>
             <Login/>
          </OpenRoute>
         } />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />

         {/* privet routes for valid user 
         As in dashboard we are showing 2 things at the same time
         1-slde Bar which is fixed all the time 
         2- page beside side bar
         Hence here we will create a parent route dashboard and all other pages are children routes
        */}
      
      <Route 
       element={
       <PrivateRoute>
        <Dashboard/>
       </PrivateRoute>
       }>
       {/* common page for both instructor and student */}
        <Route path="dashboard/my-profile" element={<MyProfile/>}/>
        <Route path="dashboard/setting" element={<Setting/>}/>
       {/* protected page only for student */}
       {
      //  console.log("user",user.accountType)
        (user?.accountType===ACCOUNT_TYPE.STUDENT)&&(
          <>
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
            <Route path="dashboard/cart" element={<Cart/>}></Route>
            <Route path="dashboard/purchase-history" element={<PurchaseHistory/>}></Route>
            <Route path="dashboard/myCart" element={<Cart/>}></Route>
          </>
        )
       }
       {
        (user?.accountType===ACCOUNT_TYPE.INSTRUCTOR)&&(
          <>
            <Route path="/dashboard/add-course" element={<CreateCourse/>}></Route>
            <Route path="/dashboard/my-courses" element={<ShowMyCourses/>}></Route>
            
          </>
        )
       }
      </Route>

      {/* Route for watching videos */}
      <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

     
   </Routes>

     </div>
  );
}

export default App;
