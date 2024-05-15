// AboutPage.js
import React from 'react';
import logo from "../assets/Logo/LearnHub2.svg"
import studyimg from "../assets/Images/aboutus2.webp"
import codeingImg from "../assets/Images1/coding image.jpg"
import logo1 from "../assets/Logo/TechSparkLogo.svg"
import Footer from '../compontnts/commmon/Footer';

const AboutPage = () => {
  return (
    <div className=" w-screen  bg-gray-100  flext items-start  text-richblack-300 text-lg">
     <div className='w-11/12 mx-auto p-4'>
     <h1 className=" text-4xl font-bold mb-4 text-[#f4511e]">About TechSpark Learn Hub</h1>
      <p className="mb-6 text-gray-700">
        TechSpark Learn Hub is a platform dedicated to providing quality education in various
        technology fields. Our mission is to empower individuals with the knowledge and skills
        needed to excel in the ever-evolving tech industry.
      </p>
      <div className='flex justify-evenly'>
      <img
        src={logo} // Replace with the actual path to your logo image
        alt="TechSpark Learn Hub Logo"
        className="w-64 h-64 object-cover mb-6 rounded-full border-4 border-blue-500"
      />
        <img
        src={studyimg} // Replace with the actual path to your logo image
        alt="TechSpark Learn Hub Logo"
        className="w-64 h-64 object-cover mb-6 rounded-full border-4 border-blue-500"
      />
        <img
        src={logo1} // Replace with the actual path to your logo image
        alt="TechSpark Learn Hub Logo"
        className="w-64 h-64 object-cover mb-6 rounded-full border-4 border-blue-500"
      />

      </div>

      <h2 className="text-2xl font-bold mb-4 text-blue-800">Our Vision</h2>
      <p className="mb-6 text-gray-700">
        We envision a world where everyone has equal access to quality education in technology,
        fostering innovation, and creating opportunities for personal and professional growth.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-blue-800">Education Assistance</h2>
      <p className="mb-6 text-gray-700">
        At TechSpark Learn Hub, we are committed to assisting individuals in their educational
        journey. Whether you're a beginner looking to start your coding adventure or an experienced
        developer seeking advanced courses, we're here to help.
      </p>
      
      {/* Reasons to Join Section */}
      <div className="flex flex-col md:flex-row items-center m-10 gap-10">
        {/* Image on the right side */}
        <img
          src={codeingImg} // Replace with the actual path to your image
          alt="Reasons to Join "
          className="w-full md:w-1/2 rounded-md object-cover mb-4 md:mb-0"
        />

        {/* Text on the left side */}
        <div className="md:w-1/2 md:ml-4">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Reasons to Join</h2>
          <ul className="list-disc pl-4 text-gray-700">
          <li>Access to high-quality educational content</li>
            <li>Experienced instructors and mentors</li>
            <li>Interactive learning environment</li>
            <li>Networking opportunities</li>
            <li>Flexible learning schedules</li>
            <li>Hands-on projects and practical exercises</li>
            <li>Career guidance and support</li>
            <li>Community forums for collaboration</li>
            {/* Add more reasons as needed */}
          </ul>
        </div>
      </div>
     </div>
      <Footer/>
    </div>
  );
};

export default AboutPage;
