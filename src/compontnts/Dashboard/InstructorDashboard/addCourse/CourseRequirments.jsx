import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function CourseRequirments(
  {  name,
    label,
    register,
    setValue,
    errors,
    }
        ) {
        
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([])
    const {course}= useSelector(state=>state.course);

    useEffect(()=>{
      register(name,{required:true});
      if(course){
        console.log(course.instructions);
        setRequirementsList(course.instructions);
      }
    },[course,name,register,setValue])
    useEffect(()=>{
      setValue(name,requirementsList);
    },[requirementsList,name, setValue]);
    
  function handleAddRequirmentList(e){
    e.preventDefault();
    if (requirement) {
      if(requirementsList.includes(requirement)){
        toast.error("insrtuction alredy exist ");
        return;
      }
      setRequirementsList([...requirementsList, requirement])
      setRequirement("");
    }
    //console.log(requirementsList);
  }

  function removeRequirmentList(index){
    let updatedList=[...requirementsList];
    updatedList.splice(index,1);
    setRequirementsList(updatedList);
  }
          
  return (
   <div>
     <div  className='flex flex-col gap-2 text-richblack-600 w-full text-lg p-2 lg:min-w-[350px]'>
    <label htmlFor={`${label}`}>
    Requirements/Instructions  <sup className="text-pink-200">*</sup>
    </label>
     <input
      name={`${name}`}
      type='text'
      placeholder="write the course instructions"
      value={requirement}
      onChange={(e)=>setRequirement(e.target.value)}
      className="form-style w-full p-3 border-2 border-blue-100 rounded-md"
     />
    </div>
    <button className='pl-2 border-white text-blue-100 font-bold'
    onClick={(e)=>handleAddRequirmentList(e)}>Add </button>

    {
          requirementsList.map((req,index)=>(
            <div key={index}>
            <span className='p-2 text-richblack-400 text-lg'>{req}</span>
            <span
            className="ml-2 text-xs text-pure-greys-300 cursor-pointer"
             onClick={()=>removeRequirmentList(index)}>
             remove</span>
            </div>
          ))
    }
    {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
   </div>

  )
}

export default CourseRequirments