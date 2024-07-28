import React, { useState, useRef } from 'react';
import { IoMdCamera } from 'react-icons/io';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserProfilePicture } from '../../../services/operations/UserData';

function UpdateProfilePicture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const inputRef = useRef();
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const profilePicture = user.image;

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.bmp']
    },
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);

    const response = await UpdateUserProfilePicture({ profilePhoto: formData, token, dispatch , user});

   // console.log("res",response);
   
    if (response) {
      // Handle successful response
      setSelectedFile(null);
      setPreviewSource(null);
    }

  };

  return (
    <div className='flex flex-col items-center justify-center p-10'>
      <div
        className='h-32 w-32 border-2 border-caribbeangreen-25 rounded-full relative'
        {...getRootProps()}
       >
        <input
          ref={inputRef}
          {...getInputProps()} // Spread props for drag-and-drop
        />
        <img
          src={previewSource || profilePicture}
          alt='Profile Pic'
          className='w-full h-full rounded-full'
        />
        <div className='absolute right-1 bottom-2 rounded-full bg-caribbeangreen-50 p-1 cursor-pointer'>
          <IoMdCamera />
        </div>
      </div>
      <div>
        {previewSource && (
          <div className='flex gap-5 mt-5'>
            <button
              className="inline-flex font-semibold items-center px-4 py-2 border-2 border-[#2196F3] text-black rounded-md hover:bg-transparent hover:text-[#2196F3] transition ease-in-out duration-150"
              onClick={() => {
                setSelectedFile(null);
                setPreviewSource(null);
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className="inline-flex items-center font-semibold px-4 py-2 bg-[#2196F3] border-2 border-[#2196F3] text-white rounded-md hover:bg-transparent hover:text-[#2196F3] transition ease-in-out duration-150"
              onClick={(e) => onHandleSubmit(e)}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProfilePicture;
