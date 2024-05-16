import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../commmon/IconBtn';
import {IoAddCircleOutline} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../services/operations/sectionAndSubsectionApi';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import ShowCourseSection from './ShowCourseSection';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import ConfirmationModal from '../../../commmon/ConfirmationModal';
import { updateCoursedetails } from '../../../../services/operations/courseApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function SectionOfCourse() {
    const {
        register,
        handleSubmit ,
        setValue,
        formState: {errors},
     } = useForm();
     const [editSectionName, setEditSectionName] = useState(null)
     const [confirmationModel ,setConfirmationModal] =useState(null);
     const [loading, setLoading] = useState(false);
     const {course}= useSelector(state=>state.course);
     const {token} = useSelector(state=>state.auth);
     const dispatch= useDispatch();
     const navigete= useNavigate();
     
     const handleEditSectionName=(sectionId,sectionName)=>{
     // console.log(sectionId,sectionName);
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
     }

     const cancelEdit =()=>{
      setEditSectionName(null);
      setValue("sectionName",'');
      errors.sectionName=false;
     }

     const handleCoursePublish = async()=>{
         let newData={}
         newData._id=course._id;
         newData.status="Published"
         const result = await updateCoursedetails(newData,token);
         if(result){
          toast.success("course published successfully ");
           dispatch(setCourse(null));
           dispatch(setStep(1));
           dispatch(setEditCourse(false));
           setConfirmationModal(null);
           navigete("/dashboard/my-courses");
         }
     }

     const handleBackToCourse =()=>{
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
     }

     const onSubmit=async(data)=>{
       // console.log("form data ",data.sectionName);
        let result =null;
       if(!editSectionName){
        setLoading(true);
       // console.log("course id",course?._id);
           result=await createSection({sectionName:data.sectionName,courseId:course?._id,token});
          //console.log("updated course data ",result.updatedCourse);
          setLoading(false);
       }
       else{
       // console.log(editSectionName);
         result = await updateSection({sectionName:data.sectionName,sectionId:editSectionName,courseId:course?._id,token});
         console.log("updated section ",result);
       }

       if(result){
        setValue("sectionName",'');
        setEditSectionName(null);
        dispatch(setCourse(result.updatedCourse));
        console.log("updated course section",result.updatedCourse.courseContents);
       }
       
     }

  return (
    <div className='w-full'>
        {/* section creation  form  */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='section'>
            Section Name
            </label>
            <input
                type='text'
                name='section'
                placeholder='Enter section name'
                {...register("sectionName",{required:true})}
                className="form-style w-full p-3 border-2 border-blue-100 mt-3 mb-4 rounded-md"
            />
             {/* { errors.sectionName &&
              <span className='text-sm text-pink-300'>This field required</span>
            } */}
         <div className='flex gap-5'>
         <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            //outline={true}
          >
            <IoAddCircleOutline size={20} className="text-black" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
         </div>
        </form>

        <div className=''>
        {
          course?.courseContents?.length >0  &&
              <ShowCourseSection handleChangeEditSectionName={handleEditSectionName}/>
        }
        </div>

       <div className='w-full flex justify-between items-end'>
       <button
           className="bg-blue-500 text-white rounded-md py-2 px-5 font-semibold  hover:bg-blue-700 my-5 flex text-lg p-5 items-center gap-1  mb-2"
           onClick={handleBackToCourse}
          >
              <AiOutlineArrowLeft/>
               Back
        </button>
       <button
          className="bg-blue-500 text-white rounded-md py-2 px-5 font-semibold hover:bg-blue-700 my-5 text-lg p-5 flex items-center gap-1 mb-2"
          onClick={()=>
            setConfirmationModal( {
                          text1: `Are you sure to publish the course'?`,
                          text2: "after publish you can edit the course",
                          btn1Text: "Publish",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleCoursePublish(course?._id),
                          btn2Handler: () => setConfirmationModal(null),
              }
            )
          }
          >
          {course?.status=="Draft"?"Publish Course":"Complete update"}
          <AiOutlineArrowRight className='font-bold'/>
       </button>
       </div>
     
      {
        confirmationModel && 
        <ConfirmationModal modalData={confirmationModel}/>      }
    </div>
  )
}

export default SectionOfCourse