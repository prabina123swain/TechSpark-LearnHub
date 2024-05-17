import React, { useState, useEffect } from 'react';
import { IoMdCamera } from "react-icons/io";
// import UpdateProfilePicture from './UpdateProfilePicture';
// import UpdatAdditionalInfo from './UpdatAdditionalInfo';
import { getUserDetails } from '../../../services/operations/UserData';
import { useSelector } from 'react-redux';
import UpdatePassword from './UpdatePassword';

function Setting() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    contactNumber: '',
    about: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       const response = await getUserDetails(token);
        console.log("Response", response.firstName);
        if (response) {
          setFormData({
            firstName: response.firstName,
            lastName: response.lastName,
            gender: response.additionalDetails.gender?response.additionalDetails.gender:'',
            dob: response.additionalDetails.dateOfBirth ? 
                 response.additionalDetails.dateOfBirth.split('.').reverse().join('-') : '',
            contactNumber: response.additionalDetails.contactNumber,
            about: response.additionalDetails.about
          });
          setProfilePicture(
            response.image
          )
         // console.log("Pic ",profilePicture);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChoosePhoto = () => {
    document.getElementById('fileInput').click(); // Trigger file input click event
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(profilePicture);
  };

  return (
    <div>
      <div className='flex items-center justify-center p-10'>
        <div className='h-32 w-32 border-2 border-caribbeangreen-25 rounded-full relative'>
        <img src={profilePicture} alt='Profile Pic' className='w-full h-full rounded-full'></img>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div className='absolute right-1 bottom-2 rounded-full bg-caribbeangreen-50 p-1' onClick={handleChoosePhoto}>
            <IoMdCamera />
          </div>
        </div>
      </div>
     
      <div className='mb-10'>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className="col-span-2 mb-4">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                rows="4"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Save Changes</button>
        </form>
      </div>
      <UpdatePassword />
    </div>
  );
}

export default Setting;
