// src/components/Loader.js
import React from 'react';
import { useSelector } from 'react-redux';
import spinner from '../../assets/Images1/Spinner.gif'; // Update with the correct path to your spinner image

const Loader = () => {
  const loading = useSelector((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-richblack-200 bg-opacity-75 z-50">
      <img src={spinner} alt="Loading..." className="w-16 h-16" />
    </div>
  );
};

export default Loader;
