import React, { useState,useRef,useEffect } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import {AiOutlineCaretDown} from "react-icons/ai"
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/operations/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../utils/constants';


//after log in we will show user details ->cart,total items,notification, name,image
export default function ProfileDropDown() {
  
  const {totalItems}= useSelector(state=>state.cart);
  const {user} = useSelector(state=>state.profile);
  const {firstName , image }= user;


  const drowDownData =[
    {
        title:"My Profile",
        logo:<CgProfile color={"green"}/>,
        linkto:"/dashboard/my-profile"
     },
    {
        title:"My courses",
        logo:<MdLibraryBooks color={"green"}/>,
        linkto:user?.accouser?.accountType === "Student"?"/dashboard/enrolled-courses":"/dashboard/my-courses"
    },
    {
        title:"Edit Profile",
        logo:<FaEdit color={"green"}/>,
        linkto:"/dashboard/setting"
    },
]

    const dispatch = useDispatch();
    const navigate = useNavigate();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Clicked outside the dropdown, so close it
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event) => {
    // Stop the click event from propagating to the document
    event.stopPropagation();

    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex gap-6 items-center '>
    <Link to={"dashboard/myCart"}>
    <div className='relative '>
       { 
        user?.accountType === ACCOUNT_TYPE.STUDENT &&
        <div>
        <FaCartShopping color='green' size={"30px"}/>
        { 
           (totalItems>0)&&<span className='absolute right-[0] top-0 w-[20px] h-[20px] rounded-full text-white flex items-center justify-center font-bold text-center text-sm aspect-square'>{totalItems}</span>
        }
        </div>
       }
     </div>
    </Link>
     <div className=' relative z-[1000]'>
            <ul className='flex flex-col gap-2  cursor-pointer' 
            onClick={toggleDropdown}>
            <li className='flex gap-2'>
            <img src={image} alt='userImg' width={"30px"} height={"30px"} className='rounded-full'/>
            <p className='italic flex items-center text-richblack-300 underline'> {firstName}
            <AiOutlineCaretDown color='green'/> </p>
            </li>
           
            <div className='bg-[#F3F3F3] text-richblack-300 italic rounded-md absolute top-11 lg:min-w-[140px] pl-2 pr-3 ' ref={dropdownRef}>
                {
              (isDropdownOpen)&&(
               <div>
             {  
              drowDownData.map((list,index)=>(
                  <Link to={`${list.linkto}`} key={index}>
                  <li className='flex items-center p-2 pl-2' >
                   {list.logo} 
                   <span className='pl-2'>{list.title}</span>
                    </li>
                  </Link>
                ))
                }
                <li className='flex items-center p-2 pl-2' 
                  onClick={()=>dispatch(logOut({navigate}))}>
                   <FiLogOut color='green'/>
                   <span className='pl-2'>LogOut</span>
                    </li>
               </div>
                
               )
                }
            </div>
            </ul>
     </div>
    </div>
  )
}
