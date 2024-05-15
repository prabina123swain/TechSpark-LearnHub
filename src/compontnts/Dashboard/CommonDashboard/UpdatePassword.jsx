import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible,AiOutlineEdit } from 'react-icons/ai';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false); // State to manage password change mode

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const toggleChangePasswordMode = () => {
    setChangePasswordMode(!changePasswordMode); // Toggle password change mode
    setCurrentPassword(''); // Reset password fields when changing mode
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to backend
    console.log('Password changed successfully!');
    setCurrentPassword(''); // Reset password fields after saving changes
    setNewPassword('');
    setConfirmNewPassword('');
    setChangePasswordMode(false); // Exit password change mode after saving changes
  };

  return (
    <div className="max-w-lg mx-auto mb-16">
      {!changePasswordMode ? ( // Display password change button if not in password change mode
      <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={toggleChangePasswordMode} className="flex items-center bg-transparent border border-gray-500 text-gray-700 px-4 py-2 rounded-lg">
          <AiOutlineEdit className="mr-2" /> Edit Password
        </button>
      </div>
    </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="mb-4 relative">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full pr-10"
            />
            <button
              className="absolute inset-y-0 pt-4 right-0 flex items-center px-2 focus:outline-none"
              onClick={toggleShowCurrentPassword}
            >
              {showCurrentPassword ? <AiFillEye className="h-5 w-5 text-blue-500" /> : <AiFillEyeInvisible className="h-5 w-5 text-blue-500" />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full pr-10"
            />
            <button
              className="absolute inset-y-0 pt-4 right-0 flex items-center px-2 focus:outline-none"
              onClick={toggleShowNewPassword}
            >
              {showNewPassword ? <AiFillEye className="h-5 w-5 text-blue-500" /> : <AiFillEyeInvisible className="h-5 w-5 text-blue-500" />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full pr-10"
            />
            <button
              className="absolute inset-y-0 pt-4 right-0 flex items-center px-2 focus:outline-none"
              onClick={toggleShowConfirmNewPassword}
            >
              {showConfirmNewPassword ? <AiFillEye className="h-5 w-5 text-blue-500" /> : <AiFillEyeInvisible className="h-5 w-5 text-blue-500" />}
            </button>
          </div>
          <div className="flex">
            <button onClick={toggleChangePasswordMode} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Cancel</button>
            <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Passoward</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
