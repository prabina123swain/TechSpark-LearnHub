import toast from "react-hot-toast";
import {  categories } from "../api";
import { apiConnector } from "../apiConnecter";
import { hideLoading, showLoading } from "../../slices/loadingSlice";

const  {
    ALL_CATEGORIES_API,
    CATALOGPAGEDATA_API ,
  } = categories


export const findAllCategoryDeatails= async()=>{
    let result=[]
    
    try {
        let response = await apiConnector("GET", ALL_CATEGORIES_API)
       // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.allCategories
      } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
      }
      return result
 }


export const categoryPageDetails = async(categoryId) =>{
    
    let result =[];
    console.log("Id-",categoryId);
    //const toastId=toast.loading("Londing..");

    try{

        const response =await apiConnector("POST",CATALOGPAGEDATA_API,
        {
          categoryId: categoryId,
        });
        console.log("Response of finding category data  ",response.data);

        if(!response.data.success){
            throw new Error ("Error in finding category data ");
        }
        result=  response.data;
        //toast.success("");
    }
    catch(e){
        toast.error(e.message);
        console.log("Eroor  ",e);
    }
    //toast.dismiss(toastId);
    return result;
}