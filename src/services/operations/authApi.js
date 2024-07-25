import { apiConnector } from "../apiConnecter";
import {endpoints} from '../api';
import toast from "react-hot-toast";
import {  setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlics";
import { resetCart } from "../../slices/cartSlice";
import { hideLoading, showLoading } from "../../slices/loadingSlice";

const {
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SENDOTP_API,
    LOGIN_API,
    SIGNUP_API
} =endpoints



export function sendOTP({email,navigate}){
    return async(dispatch)=>{
        dispatch(showLoading());
        const toastId= toast.loading("Loading...");
       try{
         //call sendOtp controller in backend
        const result = await apiConnector("POST",SENDOTP_API,{
            email
        });
        //console.log("Result of otp send ",result.data);
         if(!result.data.success){
            toast.err(result.data.message);
         }
         toast.success("OTP send successfully ");
         navigate("/verifyOtp");
       }
       catch(err){
        toast.error("Error in send otp ");
        console.log("error in sending otp ",err);
       }
       dispatch(hideLoading());
       toast.dismiss(toastId);
    }
}

export function signUp(signUpData,{otp ,navigate}){
   //console.log(signUpData);
   const data={
    ...signUpData,
    otp
   }
    return async(dispatch)=>{
        dispatch(showLoading());
        const toastId = toast.loading("Loading ..");
        try{
            const response = await apiConnector("POST",SIGNUP_API,data);
            //  console.log("Response in  sign up.. ",response.data);
              if(response.data.success===false){
                toast.error(response.data.message);
              }
              toast.success("Sign up successfully Please login");
             // waitFor2Sec();
              navigate("/login");
        }
        catch(err){
            toast.error(err.response.data.message);
            console.error("error in sign in \n",err);
            }
            dispatch(hideLoading());
            toast.dismiss(toastId);
    }
}

export function logIn({email,password,navigate}){
  //  console.log("email and password \n",email ,password );
    return async(dispatch)=>{
        dispatch(showLoading());
        const toastId = toast.loading("Loading ..");
        try{
          const response = await apiConnector("POST",LOGIN_API,{
            email,
            password
          });
          //console.log("Response in log in ",response.data);
          if(response.data.success===false){
            toast.error(response.data.message);
          }
         // console.log("token in authApi ",response.data.user.token);
          const token=response.data.user.token;
          const user= response.data.user;
         dispatch(setToken(token));
          const userImage = response.data.user.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
        dispatch(setUser({ ...response.data.user, image: userImage }));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user",JSON.stringify(user));
        toast.success("Log in successfully ");
        }
        catch(err){
        toast.error(err.response?.data.message);
        console.error("error in sign in \n",err);
        }
        dispatch(hideLoading());
        toast.dismiss(toastId);
    }
}

//logout handler function 
export function logOut({navigate}){
    return (dispatch)=>{
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("targetUrl");
      //localStorage.removeItem("token");
      toast.success("log out successfully ");
      navigate("/");
    }
}
//this function call to backend by apiconnector using api routes 
export function getPasswordResetToken(email , setmailSent){
    
    return async()=>{
        try{
           // console.log("reset password token api ",RESETPASSTOKEN_API);
         //call api connector for calling to backend
          const result=await apiConnector("POST",RESETPASSTOKEN_API,{email});
         // console.log("Result for generationg token... ",result);

          if(!result.data.success){
            throw new Error(result.data.message);
          }
          toast.success("Reset mail sent successfully");
          setmailSent(true);
        }
        catch(er){
          //  console.log("Error in Reset password token api ",er)
            toast.error("Erroe in sending Token");
        }
    }
}

export function updatePassword({newPassword , confirmPassword ,token}){
    return async(dispatch)=>{
        try{
           // console.log("api reset password",RESETPASSWORD_API);
            const result =  await apiConnector("POST",RESETPASSWORD_API,{
                password:newPassword,
                confirmPassword,
                token,
            });
            //console.log("Reset password result ",result);
            if(!result.data.success){
                toast.error(result.data.message);
            }
            toast.success("Passoward Updated successfully");
        }
        catch(e){
            toast.error("Error in reseting password");
            console.error(e);
        }
    }
}

export function OTPValidation({otp}){
     return async(dispatch)=>{
        try{
         const result = await apiConnector("GET",SENDOTP_API,{otp});
         if(!result.data.success){
            toast.error(result.data.message);
         }
         toast.success("OTP verified ");
         //waitFor2Sec();
        }
        catch{
            console.log("Error in verigying otp ");
            toast.error("OTP verification failed ");
        }
     }
} 