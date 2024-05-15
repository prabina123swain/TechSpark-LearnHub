// ConfirmationModal.jsx
import React from 'react';
import IconBtn from './IconBtn';


const ConfirmationModal = ({modalData}) => {
   // console.log("text",modalData.text1);
   return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-11/12 max-w-[370px] bg-richblack-400 rounded-lg border border-gray-600 bg-gray-800 p-6 text-white">
        <p className="text-2xl font-semibold">{modalData?.text1}</p>
        <p className="mt-3 mb-5 leading-6">{modalData?.text2}</p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
            <IconBtn
            onclick={modalData?.btn2Handler}
            text={modalData?.btn2Text}
          />
        </div>
      </div>
    </div>
  );
   }  
export default ConfirmationModal;
