import React from 'react'
import Section1 from '../compontnts/HomePage/Section1'
import Section2 from '../compontnts/HomePage/Section2'
import Timeline from '../compontnts/HomePage/Timeline'
import InstructorSection from '../compontnts/HomePage/InstructorSection'
import Footer from '../compontnts/commmon/Footer'

function Home() {
  return (
    <div className="bg-[#fdfbfc] w-full flex flex-col gap-20">
     { /* Section 1 */}
     <div className='w-10/12 mx-auto mb-10 md:mb-20' >
     <Section1/>
     </div>
     {/*Section 2 code block code */}
     <div  className='w-screen '>
      <Section2    
      codecolor={"#63266e"}
      code ={
       `<!DOCTYPE html>
       <html lang="en">
       <meta charset="UTF-8">
       <title>Page Title</title>
      <meta name="viewport" ">
      <link rel="stylesheet" href="">
      <body>
      </body>
      </html>`}
      />
     </div>
     
     <div className='w-10/12 mx-auto'>
      <Timeline/>
     </div>
   {/*Instructor section */}
     <div className='w-10/12 mx-auto'>
        <InstructorSection/>
     </div>
     <div className="">
        <Footer/>
       </div>
    </div>
  )
}

export default Home