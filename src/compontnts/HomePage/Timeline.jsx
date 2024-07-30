import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../../assets/Images/TimelineImage.png"

const TimelineData = [
    {
        logo: logo1,
        heading: "Leadership",
        description: "Fully committed to the success of the company"
    },
    {
        logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility",
        description: "Ability to switch is important"
    },
    {
        logo: logo4,
        heading: "Solve the Problem",
        description: "Code in a better way"
    },
]

function Timeline() {
    return (
        <div className='flex flex-col md:flex-row items-center p-10'>
            <div className='w-full md:w-1/2 flex flex-col gap-5 mb-10 md:mb-0'>
                <h1 className='text-4xl font-extrabold text-[#83859c] leading-9 mb-6'>Top Skills for Job</h1>
                {
                    TimelineData.map((element, index) => (
                        <div className='flex flex-row gap-3 items-start' key={index}>
                            <div className='w-12 h-12 bg-white flex items-center justify-center rounded-full'>
                                <img src={element.logo} alt={"logo"} className='w-8 h-8' />
                            </div>
                            <div>
                                <h2 className='font-semibold text-lg'>{element.heading}</h2>
                                <p className='text-base'>{element.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='w-full md:w-1/2 md:block hidden relative shadow-blue-200 h-fit rounded-lg'>
                <img src={timelineimage} className='rounded-md w-full h-auto' alt='timeline' />
            </div>
        </div>
    )
}

export default Timeline
