import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {MdClose} from 'react-icons/md'
import { useSelector } from 'react-redux';

function CourseTags(  {  name,
  label,
  register,
  setValue,
  errors,
  placeholder,
  getValues,}) {

    const [allTags,setAllTags]= useState([]);
    const {course}= useSelector(state=>state.course);

    useEffect(()=>{
      register(name,{required:true});
       if(course){
        console.log("tags",course.tags);
        setValue('tags',course.tags);
        setAllTags(course.tags);
       }
    },[]);

    useEffect(()=>{
      setValue(name,allTags);
    },[allTags]);

    function handleKeyDown(e){
      
      if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      let val=e.target.value.trim();
     // console.log(val);
      if (val) {
        if(allTags.includes(val)){
          toast.error("insrtuction alredy exist ");
          return;
        }
        setAllTags([...allTags, val]);
       // setTag("");
        e.target.value = ""
      }
    }
     // console.log(allTags);
    }
  
    function handleRemoveTag(index){
      let updatedList=[...allTags];
      updatedList.splice(index,1);
      setAllTags(updatedList);
    }

  return (
    <div>
      <div  className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[350px]'>
    <label htmlFor={`${name}`}>{label}
    <sup className="text-pink-200">*</sup></label>
   <div className='flex flex-wrap lg:max-w-[300px]'>
   {
      allTags.map((req,index)=>(
       <div key={index} className='flex items-center border-2 pl-2 pr-2 pt-1 pb-1 rounded-full border-richblack-300 m-1'>
       <span  className=' text-richblack-400 text-lg'>{req}</span>
            <MdClose  onClick={()=>handleRemoveTag(index)} className="text-sm"></MdClose>
       </div>
          ))
    }
   </div>
     <input
      name={`${name}`}
      type='text'
      placeholder={placeholder}
       onKeyDown={(e)=>handleKeyDown(e)}
      className="form-style w-full p-3 border-2 border-blue-100 rounded-md"
     />
    </div>
    {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
   </div>
  )
}

export default CourseTags