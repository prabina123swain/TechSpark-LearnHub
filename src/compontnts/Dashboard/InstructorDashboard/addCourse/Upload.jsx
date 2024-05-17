import React, { useState,useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone';
import { BigPlayButton, Player } from 'video-react';
import {FiUploadCloud} from 'react-icons/fi'


export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
 // console.log(editData,previewSource);
  const [selectedFile,setSelectedFile]=useState(null);
  const inputRef = useRef();

  useEffect(()=>{
    register(name,{required:true});
  },[register,name]);

  useEffect(()=>{
    setValue(name,selectedFile);
  },[selectedFile , name, setValue]);

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  //onDrop is a callback function which is trigger when a file is added from local storage
  //used as a option in useDropzone hook of react
  const onDrop=(acceptedFiles)=>{
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }
  
  //useDrop zone hook is helped for drag and drop files from local storage which provide
  //getRootProps and getInputProps and two methods and isDragActive value for showing as we had dropped a file/not
 //inside useDropzone some options are defined for restricrcting the use
  const {getRootProps,getInputProps}=useDropzone({
    accept:video?{ "video/*": [".mp4"] }:
    {"image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  })


  return (
    <div>
     <div  className='flex flex-col gap-2 text-white w-full text-lg p-2 lg:min-w-[350px] mb-2'>
      <label htmlFor={`${name}`}>{label}
      <sup className="text-pink-200">*</sup></label>
     </div>
     <div className="form-style  w-full p-3 border-2 border-blue-100 rounded-md">
       {
        (previewSource)?(
          <div className='flex flex-col'>
             {
              !video?(
                <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover max-h-[300px] max-w-[300px] mx-auto"
              />)
              :(
                <div className="flex-1 p-4">
                <Player
              //  ref={playerRef}
                aspectRatio="16:9"
                playsInline
                src={previewSource}
                >
              <BigPlayButton position="center" />
            </Player>
          

      </div>
              )
             }
             {/* this for when we anr not viewing data can cel buttom will show */}
              {
                !viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
          ):
          (
            <div
            className="flex w-full flex-col items-center p-6 cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef}/>
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-500">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

