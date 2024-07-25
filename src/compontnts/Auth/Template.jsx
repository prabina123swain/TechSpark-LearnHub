import React from 'react'
import Form from './Form';

function Template({data , formType}) {
  return (
    <div className="w-full flex items-center justify-center p-10 pb-20 bg-gradient-to-r from-[#2937b7] to-blue-500 ">
       <Form inputData={data} formType={formType}/>
    </div>
  )
}

export default Template