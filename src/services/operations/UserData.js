//get user details 
//update user details
import {toast} from 'react-hot-toast';
import { profileEndpoints } from '../api';
import { apiConnector } from '../apiConnecter';

const {
    GET_USER_DETAILS_API,
    UPDATE_PROFILE_API
}  = profileEndpoints

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

// export const UpdateUserDetails = async(userData) =>{
//     let userData;
//     try{
//         const result =  await apiConnector("POST", UPDATE_PROFILE_API);
//         console.log("user details result ",result);

//         if(result.success){
//             userData=result;
//         }
//     }
//     catch(e){
//         toast.error("Error in reseting password");
//         console.error(e);
//     }
//     return userData;
// }