import React from 'react';

function CourseInstructor({ instructor }) {
  return (
    <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h3 className="text-xl font-bold text-[#FF469F]">About Instructor</h3>
      <div className='w-10 h-1  bg-[#FF469F] mb-10'></div>

      <div className="flex flex-col sm:flex-row  justify-between">
        {/* Instructor Photo */}
        <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
          <img
            src={instructor.image}
            alt={`${instructor.firstName} ${instructor.lastName}`}
            className="h-32 w-32 rounded-full"
          />
        </div>
        {/* Instructor Details */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-2xl font-bold">{`${instructor.firstName} ${instructor.lastName}`}</h2>
          <p className="text-pure-greys-500 text-sm">5+ Years of Experience</p>
          <p className="text-pure-greys-500 text-sm">100000+ satisfied students</p>
          <p className="text-pure-greys-500 text-sm">Expertise on Computer Science</p>
        </div>
        {/* Instructor About */}
        <div className="w-1/2 flex flex-col flex-grow mt-4 sm:mt-0 sm:ml-4">
          <h3 className="text-lg font-semibold mb-2">About the Instructor:</h3>
          <p className="text-pure-greys-500 text-sm">
            {instructor.about ||
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit lorem at justo molestie,
              at vehicula est efficitur. Nullam fermentum sagittis quam, id interdum lorem vestibulum ac.
              Quisque varius erat at justo euismod aliquet. Phasellus feugiat consequat tellus, et gravida libero congue nec.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseInstructor;
