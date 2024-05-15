import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../../assets/Images/TimelineImage.png"

const TimelineData = [
    {
        logo:logo1,
        heaing:"Leadership",
        description:"Fully commited to the success company"
    },
    {
        logo:logo2,
        heaing:"Responsibility",
        description:"Student will be always our top priority"
    },
    {
        logo:logo3,
        heaing:"Flexibility",
        description:"Ability to switch is an important"
    },
    {
        logo:logo4,
        heaing:"Solve the problem",
        description:"Code in better way"
    },

]

function Timeline() {
  return (
    <div className='flex items-center p-10'>
        <div className='w-[45%] flex flex-col gap-5'>
        <h1 className='text-4xl font-extrabold text-[#83859c] leading-9 mb-6'>Top skills for job</h1>
          {
          TimelineData.map((element , index)=>{
            return(
              <div className='flex flex-row gap-0' key={index}>
                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                   <img src={element.logo} alt={"logo"}/>
                </div>
                <div>
                    <h2 className='font-semibold text-[18px]'>{element.heaing}</h2>
                    <p className='font-base'>{element.description}</p>
                </div>
              </div>
            )
          })
          }
        </div>
        <div className='w-[50%] relative shadow-blue-200 h-fit rounded-lg'>
            <div className='object-cover '>
                <img src={timelineimage} className='rounded-md' alt='timeline' />
            </div>
        </div>
    </div>
)}

export default Timeline