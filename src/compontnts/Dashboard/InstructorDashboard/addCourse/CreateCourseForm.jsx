import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { updateCoursedetails } from '../../../../services/operations/courseApi';
import { findAllCategoryDeatails } from '../../../../services/operations/CategoryPageData';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import CourseRequirments from './CourseRequirments';
import CourseTags from './CourseTags';
import Upload from './Upload';
import {MdNavigateNext} from 'react-icons/md'
import IconBtn from '../../../commmon/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse ,setStep,setEditCourse } from '../../../../slices/courseSlice';
import {addCourseDetails} from '../../../../services/operations/courseApi'
import toast from 'react-hot-toast';

function CreateCourseForm() {

  const [courseCategories,setCourseCategories]= useState([]);
  const [loading,setLoading] = useState(false);
  const {token} =useSelector(state=>state.auth);
  const {editCourse,course}= useSelector(state=>state.course);
  
   const dispatch = useDispatch();
   
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

   useEffect(()=>{
      if(editCourse){
         setValue("courseName",course.courseName);
         setValue("category",course.category);
         setValue("courseName",course.courseName);
         setValue("courseDescription",course.courseDescription);
         setValue("whatYouWillLearn",course.whatYouWillLearn);
         setValue("thumbnailImage",course.thumbnail);
         setValue("price",course.price);
         setValue("tags",course.tags);
         setValue("instructions",course.instructions);
      }
   })

   
function arraysAreEqual(arr1, arr2) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Iterate over each element and recursively compare nested arrays
  for (let i = 0; i < arr1.length; i++) {
    const element1 = arr1[i];
    const element2 = arr2[i];

    if (Array.isArray(element1) && Array.isArray(element2)) {
      // If the elements are arrays, recursively compare the arrays
      if (!arraysAreEqual(element1, element2)) {
        return false;
      }
    } else if (element1 !== element2) {
      // If the elements are not arrays, compare them directly
      return false;
    }
  }

  // If all elements are equal, the arrays are equal
  return true;
}


    async function getAllcategoryDetails(){
       // setLoading(true);
        const result= await findAllCategoryDeatails();
         console.log("all categories ",result);
         setCourseCategories(result);
        // setLoading(false);
       }
        useEffect(()=>{
            getAllcategoryDetails();
           
        },[])

    async function handleEditCourse(){
      let currentValues = getValues();
     // console.log("current values ",currentValues,course);
      let newData={};
        for (const key in course) {
          if (course.hasOwnProperty(key)) {
        // console.log(`${key}: ${course[key]} ,${currentValues[key]}`);

         if (Array.isArray(course[key]) && Array.isArray(currentValues[key])) {
          // If the values are arrays,  compare the arrays
          if (!arraysAreEqual(course[key], currentValues[key])) {
            // console.log(key);
            newData[key]=JSON.stringify(currentValues[key]);
          }
        } else if(currentValues[key]!==undefined && course[key]!==currentValues[key]){
          //console.log(key);
          newData[key]=currentValues[key];
        }
        }
      }

     //handle course thumbnail files
      if(currentValues.thumbnailImage!=course.thumbnail){
        console.log("thumbnail mis matched" );
         newData.thumbnailImage=currentValues.thumbnailImage
      }

         if(Object.keys(newData).length > 0){
          //insert course id into newData
           newData._id=course._id;
           // console.log("new data",newData);
            const result=await updateCoursedetails(newData,token);
           // console.log("result ",result);
           dispatch(setCourse(result));
           dispatch(setEditCourse(false));
         }
         else{
          toast.success("No data changed");
         }
         dispatch(setStep(2));
    }

    const onSubmit =async (data) => {
      //console.log("data ",data); 
      let formData = new FormData()
      if(editCourse){
         handleEditCourse();
         return;
      }
      data.tags=JSON.stringify(data.tags);
      data.instructions=JSON.stringify(data.instructions)
      formData =data 
      // formData.set('tags',JSON.stringify(data.tags));
      // formData.set('instructions',JSON.stringify(data.instructions));
      console.log(formData);
      let result = await addCourseDetails(formData, token);
      console.log("result ",result);
     if (result) {
       dispatch(setCourse(result.courseDetails))
       dispatch  (setStep(2))
     }
      setLoading(false)
    }
  
    return (
    <div className='flex flex-col gap-6 p-6  w-full justify-center items-center '>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[250px]'>
      <label htmlFor='Course Category' >
      Course Category <sup className="text-pink-200">*</sup>
      </label>
      <select
        {...register("category",{requireed:true})}
        defaultValue=""
        id="category"
        className="form-style w-full p-3 border-2 border-blue-100 rounded-md"
        >
         <option value="" disabled>
            Choose a Category
          </option> 
          {
            (!loading) && (
                courseCategories.map((category ,index)=>(
                    <option key={index} value={category._id}>
                        {category.name}
                    </option>
                ))
            )
          }
      </select>
      {errors&&(
          <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.message}
            </span>)}     
     </div>
  
      <div  className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[350px]'>
                <label htmlFor="Title" >Course Title<sup className="text-pink-200">*</sup></label>
                <input
                type="text"
                id='courseTitle'
                name="courseName"
                placeholder="Enter course Title"
                {...register("courseName",{required:true})}
                className="form-style w-full p-3 border-2 border-blue-100 rounded-md"
                >
                </input>
      </div>
      {errors.courseName&&(
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                  course title can not be empty
                  </span>)}

      <div  className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[350px]'>
                <label htmlFor="Title" >Course Description<sup className="text-pink-200">*</sup></label>
                <textarea
                type="text"
                name="courseDescription"
                placeholder="Enter short description about course"
                {...register("courseDescription",{required:true})}
                className="form-style w-full p-3 border-2 border-blue-100 rounded-md lg:min-h-[100px]"
                >
                </textarea>
                {errors.courseDescription&&(
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                  course description can not be empty
                  </span>)}
      </div>

      <div  className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[350px] relative'>
                <label htmlFor="price" >Course Price<sup className="text-pink-200">*</sup></label>
                <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 border-2 border-blue-100 p-3 rounded-md"
          />
         <HiOutlineCurrencyRupee className="absolute left-3 top-[68%] inline-block -translate-y-1/2 text-2xl text-richblack-400" />
      </div>
      {errors.price&&(
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                  course price can not be empty
                  </span>)}
      {/* course tages  */}
      <CourseTags
        name="tags"
        label="Course Tages"
        placeholder="write course tags and enter"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* upload image */}
      <Upload
        name="thumbnailImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={ editCourse?course?.thumbnail:null}
      />

      {/* course requirments */}
      <CourseRequirments
        name="instructions"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Beifits from the course */}

      <div  className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[350px]'>
                <label htmlFor="Title" >Course Benifits<sup className="text-pink-200">*</sup></label>
                <textarea
                type="text"
                name="courseDescription"
                placeholder="Enter benifits of the course"
                {...register("whatYouWillLearn",{required:true})}
                className="form-style w-full p-3 border-2 border-blue-100 rounded-md lg:min-h-[100px]"
                >
                </textarea>
                {errors.whatWeWilllearn &&(
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                  course title can not be empty
                  </span>)}
      </div>

      {/* <button type="submit">Create Course</button> */}

    <div className='flex justify-end gap-10 mt-5'>
    {
        editCourse && 
        <button className='underline text-lg text-richblack-500 cursor-pointer'
          onClick={()=>{
           // console.log("clicked");
            dispatch(setEditCourse(false));
            dispatch(setStep(2));
          }}>
          Cancel Edit
        </button>
        }
       <IconBtn
          disabled={loading}
          text={!editCourse?"Next":"Update"}
        >
          <MdNavigateNext />
        </IconBtn> 
    </div>

      </form>
       </div>
    );
  };

export default CreateCourseForm