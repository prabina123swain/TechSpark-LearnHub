import  { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FiSettings } from "react-icons/fi";
import { logOut } from '../../../services/operations/authApi';


function Sidebar() {
 const location = useLocation();
  const {user}= useSelector(state=>state.profile);
  const dispatch= useDispatch();
  const navigate= useNavigate();

  function logOutHandler(){
    dispatch(logOut({navigate}));
  }

  return (
    <div className='bg-[#eeeef6] border-[20px] border-[#F0F3F5] p-4 text-richblack-900 text-lg font-normal'>
     <ul className='flex flex-col gap-2'>
       {
        sidebarLinks.map((elem,index)=>(
            (user.accountType===(elem.type?elem.type:user.accountType)) &&(
              <NavLink key={index} to={`${elem.path}`}>
              <li  className={`flex gap-2 items-center p-2 ${elem.path===location.pathname?("bg-[#e2f8e3] w-full h-full rounded-md"):("")}`}>
              {elem.icon}
             {elem.name}
               </li>
              </NavLink>
            )
        ))
       }
     <div className=' mt-5 mb-1 w-full bg-richblack-300 h-[0.5px]'></div>
     <li  className={`flex gap-2 items-center p-2 ${"/dashboard/setting"===location.pathname?("bg-[#e2f8e3] w-full h-full rounded-md"):("")}`}>
     <FiSettings/>
     <NavLink to={"dashboard/setting"}>Setting</NavLink>
     </li>
     <li  className={`flex gap-2 items-center p-2`} onClick={logOutHandler}>
     <FiLogOut/>
      <button>LogOut</button>
    </li>
     </ul>
    </div>
  )
}

export default Sidebar