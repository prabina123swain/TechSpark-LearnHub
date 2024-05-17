import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnecter";
import { courseEndpoints } from "../api";

const {
  COURSE_DETAILS_API,
  // GET_ALL_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_ALL_STUDENT_COURSES_API,
  DELETE_COURSE_API,
  
} = courseEndpoints


export const addCourseDetails = async(data,token)=>{
  let toastId=toast.loading();
  console.log("data in creating course ",data);
  let result=null;
   try{
     const response = await apiConnector("POST",CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    
    console.log("CREATE COURSE API RESPONSE............", response?.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
     result = response?.data
    // console.log("res..",result);
    toast.success("Course Details Added Successfully")
   
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result;
}

export const findCourseDetails = async({courseId})=>{
   let result;
   const toastId=toast.loading("loading...");
   try{
      const response = await apiConnector("POST",COURSE_DETAILS_API,{courseId});
      console.log("RESPONSE OF COURSE DETAILS API ",response.data);
      result=response.data.courseDetails;
   } catch (error) {
    console.log("FIND COURSE DETAILS API ERROR............", error)
    toast.error(error.message)  
  }
  toast.dismiss(toastId)
  return result;
}

export const getFullCourseDetails = async({courseId,token})=>{
  let result;
  console.log(token,courseId);
  const toastId=toast.loading("loading...");
  try{
     const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},
                                       {Authorization:`Bearer ${token}`}
                                       );
     console.log("RESPONSE OF FULL COURSE DETAILS API ",response.data);
     result=response.data.courseDetails;
  } catch (error) {
   console.log("FIND COMPLETE COURSE DETAILS API ERROR............", error)
   toast.error(error.message)  
 }
 toast.dismiss(toastId)
 return result;
}

export const userCourses =async({token})=>{
     let result;
     const toastId=toast.loading();
     try{
     // console.log("abcde");
       const response= await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
        Authorization:`Bearer ${token}`
       });
       console.log("COUSE DETAILS API RESULT ..",response);
       if(response.data.status){
           throw new Error("Error in fetching course details");
       }
       result=response.data;
     }
     catch(e){
      console.log("ERROR IN FETCHING COURSE DETAILS...",e.message);
     }
     toast.dismiss(toastId);
     return result;
}


export const studentCourses =async({token})=>{
  let result;
  const toastId=toast.loading();
  try{
  // console.log("abcde");
    const response= await apiConnector("GET",GET_ALL_STUDENT_COURSES_API,null,{
     Authorization:`Bearer ${token}`
    });
    console.log("COUSE DETAILS API RESULT ..",response);
    if(response.data.status){
        throw new Error("Error in fetching course details");
    }
    result=response.data;
  }
  catch(e){
   console.log("ERROR IN FETCHING COURSE DETAILS...",e.message);
  }
  toast.dismiss(toastId);
  return result;
}

export const deleteCourse = async({courseId,token})=>{
    let result;
    const toastId= toast.loading("Loading...");
    console.log(courseId,token);
     try{
        const response= await apiConnector("DELETE",DELETE_COURSE_API,{courseId},{
          Authorization:`Bearer ${token}`
        });
        console.log("DELETE COURSE API RESPONSE ..",response);

        if(!response.data.success){
          throw new Error("Error in deleteing course ");
        }
        toast.success("Course deleted successfully ");
        result=response.data;
     }
     catch(err){
        toast.error(err.message);
     }
     toast.dismiss(toastId);
     return result;
}

export const updateCoursedetails = async(newdata,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, newdata, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

