import React, { useState } from 'react';
import logo from "../../assets/Logo/LearnHub2.svg";
import { Link } from 'react-router-dom';
import Button from '../HomePage/Button';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProfileDropDown from '../Auth/ProfileDropDown';
import { NavbarLinks } from '../../data/navbar-links';

function Navbar() {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between py-4'>
      <div className='flex items-center'>
        <Link to="/">
          <img src={logo} height={60} width={60} alt='Tech logo' className='object-fill' />
        </Link>
      </div>

      <div className={`flex flex-col md:flex-row md:items-center md:gap-7 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0 md:max-h-full'} w-full md:w-auto overflow-hidden`}>
        <ul className='flex flex-col md:flex-row gap-4 md:gap-7 text-richblack-300 text-xl font-medium p-3'>
          {NavbarLinks.map((elem, index) => (
            <li key={index} className={`${location.pathname === elem.path ? "text-black" : ""}`}>
              <Link to={elem.path}>{elem.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col md:flex-row gap-4 md:gap-5 items-center mt-4 md:mt-0'>
        {
          token === null ? (
            <div className='flex gap-4'>
              <Button active={true} linkto={"/signUp"}>SignUp</Button>
              <Button active={false} linkto={"/login"}>Login</Button>
            </div>
          ) : (
            <ProfileDropDown />
          )
        }
      </div>

      <button className='md:hidden p-2 text-xl' onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </button>
    </div>
  );
}

export default Navbar;
