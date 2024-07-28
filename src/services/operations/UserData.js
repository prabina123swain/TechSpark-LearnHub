//get user details 
//update user details
import {toast} from 'react-hot-toast';
import { profileEndpoints, settingsEndpoints } from '../api';
import { apiConnector } from '../apiConnecter';
import { hideLoading, showLoading } from '../../slices/loadingSlice';
import { setUser } from '../../slices/profileSlics';

const {
    GET_USER_DETAILS_API,
}  = profileEndpoints

const {
    UPDATE_USER_PROFILE_API,
    UPDATE_PROFILE_PICTURE_API
  } = settingsEndpoints

export const getUserDetails= async(token)=> {
    let userData;
    try{
        console.log("Data");
        const result =  await apiConnector("GET", GET_USER_DETAILS_API,null,{
            Authorization:`Bearer ${token}`
           });
        console.log("user details result ",result.data);
        if(result.data.success){
            userData=result.data.user;
        }
    }
    catch(e){
        toast.error("Error in reseting password");
        console.error(e);
    }
    return userData;
}


export const UpdateUserDetails = async({userData,token,dispatch}) =>{
    let result;
    dispatch(showLoading());
    try{
        const response =  await apiConnector("PUT",UPDATE_USER_PROFILE_API ,userData,{
                                Authorization:`Bearer ${token}`
                            });
        
       // console.log("update user details result ",response.data.updatedUser);

        if(!response.data.success) {
            throw new Error("unable to update profile");
        }
        toast.success("profile data updated");
        const user = response.data.updatedUser;
        dispatch(setUser(user));
        localStorage.setItem("user",JSON.stringify(user));

        result = user;
    }
    catch(e){
        toast.error("Error in updating profile data");
        console.error(e.message);
    }
    dispatch(hideLoading());
    return result;

}


export const UpdateUserProfilePicture = async({profilePhoto,token,dispatch,user}) =>{
    let result;
    //console.log("photo ",profilePhoto,user);
    dispatch(showLoading());
    try{
        const response =  await apiConnector("PUT",UPDATE_PROFILE_PICTURE_API ,profilePhoto,
                            {
                                "Content-Type": "multipart/form-data",
                                Authorization:`Bearer ${token}`
                            });
        
        
        const url = response.data.url;
        // console.log("update profile photo result ",url);
        
       localStorage.setItem('user',JSON.stringify({...user,image:url}));
        dispatch(setUser({...user,image:url}));
        if(!response.data.success) {
            throw new Error("unable to update profile");
        }
        toast.success("profile data updated");
        result = url;
    //     dispatch(setUser(result));
    }
    catch(e){
        toast.error("Error in updating profile data");
        console.error(e.message);
    }
    dispatch(hideLoading());

    return result;
}