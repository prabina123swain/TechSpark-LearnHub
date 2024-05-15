import React from 'react'
import Form from './Form';

function Template({data , formType}) {
  return (
    <div className="flex items-center justify-center p-10 pb-20 bg-gradient-to-r from-[#2937b7] to-blue-500 ">
      <div className=''>
     <Form inputData={data} formType={formType}/>
      </div>
    </div>
  )
}

export default Template