import toast from "react-hot-toast";
import { courseEndpoints } from "../api";
import { apiConnector } from "../apiConnecter";


const {
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
} =courseEndpoints;

//create section 

export const createSection = async({sectionName,courseId,token})=>{
    const toasstid=toast.loading();
    let result;

    try{
      const response = await apiConnector("POST" ,CREATE_SECTION_API, {sectionName,courseId}, {
        Authorization: `Bearer ${token}`,
      } );
      console.log("RESPONSE OF CREATE SECTION API ..",response.data);
      if(!response.data.success){
        throw new Error("Could Not Add Lecture")
      }
      result=response.data;
      toast.success("section added ");
    }
    catch(e){
        console.log("error in create section ",e);
        toast.error(e.message);
    }

    toast.dismiss(toasstid);
    return result;
}

export const updateSection = async({sectionName,sectionId,courseId,token})=>{
  console.log(sectionId,sectionName,courseId);
    const toasstid=toast.loading();
    let result;

    try{
      const response = await apiConnector("POST" ,UPDATE_SECTION_API,{sectionName,sectionId,courseId}, {
        Authorization: `Bearer ${token}`,
      } );
      console.log("RESPONSE OF CREATE SECTION API ..",response.data);
      if(!response.data.success){
        throw new Error("Could Not Add Lecture")
      }
      result=response.data;
      toast.success("section name updated ");
    }
    catch(e){
        console.log("error in create section ",e);
        toast.error(e.message);
    }

    toast.dismiss(toasstid);
    return result;
}

export const deleteSection = async({sectionId,courseId,token})=>{
  const toasstid=toast.loading();
  let result;

  try{
    const response = await apiConnector("DELETE" ,DELETE_SECTION_API,{sectionId,courseId}, {
      Authorization: `Bearer ${token}`,
    } );
    console.log("RESPONSE OF DELDETE SECTION API ..",response.data);
    if(!response.data.success){
      throw new Error("Could Not Add Lecture")
    }
    result=response.data;
    toast.success("section deleted successfully ");
  }
  catch(e){
      console.log("error in create section ",e);
      toast.error(e.message);
  }

  toast.dismiss(toasstid);
  return result;
}


export const createSubSection = async({ 
   title,description, sectionId,video,token})=>{
  let toastId=toast.loading();
  let result=null;
   try{
 //   console.log("sub section  data ",video,sectionId,decsription,title,token);
     const response = await apiConnector("POST",CREATE_SUBSECTION_API, {
      title,
      description,
      sectionId,
      video
     }, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    
    console.log("CREATE SUBSECTION API RESPONSE............", response?.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Subsection")
    }
     result = response?.data
    // console.log("res..",result);
    toast.success("SubSection Added Successfully")
   
  } catch (error) {
    console.log("CREATE SUBSECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result;
}

export const updateSubSection = async({subSectionId,title,description,video,sectionId,token})=>{
 let toastId=toast.loading();
 let result=null;
  try{
  console.log("sub section  data ",title,description,video,sectionId);
    const response = await apiConnector("POST",UPDATE_SUBSECTION_API, {
      subSectionId,
      title,
     description,
     sectionId,
     video
    }, {
     "Content-Type": "multipart/form-data",
     Authorization: `Bearer ${token}`,
   })
   
   console.log("UPDATE SUBSECTION API RESPONSE............", response?.data)
   if (!response?.data?.success) {
     throw new Error("Could Not update Subsection")
   }
    result = response?.data
   // console.log("res..",result);
   toast.success("SubSection updated Successfully")
  
 } catch (error) {
   console.log("UPDATE SUBSECTION API ERROR............", error)
   toast.error(error.message)
 }
 toast.dismiss(toastId)
 return result;
}

export const deleteSubSection = async({subSectionId,sectionId,token})=>{
  let result;
  const toastId = toast.loading();
  try{
    const response = await apiConnector("DELETE",DELETE_SUBSECTION_API,
              {subSectionId,
               sectionId },
              {
               Authorization:`Bearer ${token}`,
               })
      console.log("RESPONCE IN DELETING SUB DECTION ",response);
      if(!response.data.success){
        throw new Error("SubSection can't deleted ");
      }
      toast.success("Sub section Deleted successfully ");
      result=response.data;
  }
  catch(e){
    toast.error(e.message);
    console.log("Error in deleting subsection ",e.message);
  }
  toast.dismiss(toastId);
  return result;
}
