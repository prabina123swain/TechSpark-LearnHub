import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserDetails } from '../../../services/operations/UserData';
import toast from 'react-hot-toast';

function UpdateAdditionalInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    contactNumber: '',
    about: ''
  });

  const [formDataChanged, setFormDataChanged] = useState(false);

  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);

  // Update form data based on the user data
  const updateFormData = (user) => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.additionalDetails?.gender || '',
      dateOfBirth: user?.additionalDetails?.dateOfBirth ? user.additionalDetails.dateOfBirth.split('.').reverse().join('-') : '',
      contactNumber: user?.additionalDetails?.contactNumber || '',
      about: user?.additionalDetails?.about || ''
    });
  };

  // Effect to update form data when the user data changes
  useEffect(() => {
    if (user) updateFormData(user);
  }, [user]);

  // Check if form data has changes compared to the user data
  const hasFormChanges = (formData, user) => {
    const userData = {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.additionalDetails?.gender || '',
      dateOfBirth: user?.additionalDetails?.dateOfBirth ? user.additionalDetails.dateOfBirth.split('.').reverse().join('-') : '',
      contactNumber: user?.additionalDetails?.contactNumber || '',
      about: user?.additionalDetails?.about || ''
    };

    for (const key in formData) {
      if (formData[key] !== userData[key]) {
        return true;
      }
    }
    return false;
  };

  // Handle input change in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormDataChanged(hasFormChanges({
      ...formData,
      [name]: value
    }, user));
  };

  // Handle cancel button click to reset form data
  const handleCancel = (e) => {
    e.preventDefault();
    updateFormData(user);
    setFormDataChanged(false);
  };

  // Handle form submit to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDataChanged) {
      const response = await UpdateUserDetails({ userData: formData, token, dispatch });
      if (response) {
        setFormDataChanged(false);
      }
    } else {
      toast.error("No changes found");
    }
  };

  return (
    <div className='mt-5'>
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
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
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
        {formDataChanged && (
          <div className='flex justify-end gap-10 mt-5'>
            <button
              type='button'
              className="inline-flex font-semibold items-center px-4 py-2 border-2 border-[#2196F3] text-black rounded-md hover:bg-transparent hover:text-[#2196F3] transition ease-in-out duration-150"
              onClick={handleCancel}
            >
              Cancel changes
            </button>
            <button
              type='submit'
              className="inline-flex items-center font-semibold px-4 py-2 bg-[#2196F3] border-2 border-[#2196F3] text-white rounded-md hover:bg-transparent hover:text-[#2196F3] transition ease-in-out duration-150"
            >
              Save changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UpdateAdditionalInfo;
