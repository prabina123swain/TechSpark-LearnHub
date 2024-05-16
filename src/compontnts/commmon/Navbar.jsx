import logo from "../../assets/Logo/LearnHub2.svg"
import { Link } from 'react-router-dom'
import Button from '../HomePage/Button'
import {  useSelector } from 'react-redux'
// import {apiConnector} from "../../services/apiConnecter"
// import { categories } from '../../services/api'
import { useLocation } from 'react-router-dom'
import ProfileDropDown from '../Auth/ProfileDropDown'
import { NavbarLinks } from '../../data/navbar-links'
//import { logOut } from '../../services/operations/authApi'

function Navabar() {
  const location = useLocation();
  const {token} = useSelector((state)=>state.auth);


  return (
    <div className='w-11/12 mx-auto flex align-middle items-center justify-between'>
     <div>
      <Link to="/">
      <img  src={logo} height={90} width={90} alt='Tech logo' className=' object-fill'/>
      </Link>
     </div>

      <div >
      <ul className='flex gap-7  flex-row text-richblack-300 text-xl font-medium p-3'>
       {
        NavbarLinks.map((elem  ,index)=>(
          <div key={index} className={`${location.pathname===elem.path?"text-black":""}`} >
         <li>
         <Link to={elem.path} > {elem.title}</Link>
         </li> 
         </div>
        ))
       }
      </ul>
     </div>
     <div className='flex gap-5 items-center'>
      {
        //add cart symbol Here latar
        (token===null)?(
          <div className='flex gap-8'>
          <Button active={true} linkto={"/signUp"} >SignUp</Button>
          <Button active={false} linkto={"/login"} >Login</Button>
          </div>
        ):(
          <div>
          <ProfileDropDown/>
          </div>
        )
      }
      {/* <button className='border-2' onClick={logOutHandler}>Logout</button> */}
     </div>
    </div>
  )
}

export default Navabar