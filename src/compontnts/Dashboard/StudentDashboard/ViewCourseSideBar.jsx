import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFullCourseDetails } from "../../../services/operations/courseApi";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";

function ViewCourseSideBar() {
  const path = useParams();
  const { token } = useSelector((state) => state.auth);

  const [courseSections, setCourseSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  async function getFullCourseData() {
    const result = await getFullCourseDetails({ courseId: path.courseId, token });
    console.log(result.courseContents);
    setCourseSections(result.courseContents);
  }

  useEffect(() => {
    getFullCourseData();
  }, []);

  return (
    <div className="bg-[#eeeef6] border-[5px] border-[#F0F3F5] text-richblack-900 text-lg font-normal p-5 pr-10 lg:max-w-[300px]">
      <h1 className="flex flex-col gap-2 mb-4 text-xl font-semibold">Course Contents</h1>
      <ul>
        {courseSections.map((section, index) => (
          <li key={index} className="text-md">
            <div
              className={`flex items-center gap-2 ${activeSection === index ? 'font-semibold' : 'font-normal'}`}
              onClick={() => setActiveSection(index)}
            >
              <span>{section.sectionName.split(' ').slice(0, 2).join(' ')}...</span>
              <span><FaChevronRight/></span>
            </div>
            {/* Render subsections only if the current section is active */}
            {activeSection === index && (
              <ul>
                {section.subSection?.map((subsection, subIndex) => (
                  <li key={subIndex} className="text-md ml-3">
                  {subsection.title.split(' ').slice(0, 3).join(' ')}...
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewCourseSideBar;
