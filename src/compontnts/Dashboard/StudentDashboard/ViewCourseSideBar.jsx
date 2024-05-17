import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function ViewCourseSideBar() {
  const { sectionId, subSectionId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [activeSectionId, setActiveSectionId] = useState([]);

  function handleActiveSectionId(id) {
    setActiveSectionId((prev) => {
      if (prev.includes(id)) {
        // If the section is already active, remove it
        return prev.filter((sectionId) => sectionId !== id);
      } else {
        // Otherwise, add it to the active sections
        return [...prev, id];
      }
    });
  }

  useEffect(() => {
    if (sectionId) {
      handleActiveSectionId(sectionId);
    }
  }, [sectionId]);

  return (
    <div className=" text-richblack-900 text-lg font-normal p-3 lg:max-w-[300px] h-screen">
      <h1 className="flex flex-col gap-2 mb-4 text-xl font-semibold">Course Contents</h1>
      <ul>
        {course?.courseContents?.map((section, index) => (
          <li key={index} className="mt-2 w-full cursor-pointer text-md py-3 text-richblack-600 bg-white rounded-lg">
            <div
              className={`flex flex-row justify-between items-center px-5 gap-2 cursor-pointer ${
                activeSectionId.includes(section._id) ? 'font-semibold' : 'font-lg'
              }`}
              onClick={() => handleActiveSectionId(section._id)}
            >
              <span
              >{section.sectionName.split(' ').slice(0, 2).join(' ')}...</span>
              <span
                className={`${
                  activeSectionId.includes(section._id)
                    ? "rotate-0"
                    : "rotate-90"
                } transition-all duration-500`}
              >
                <BsChevronRight />
              </span>
            </div>
            {activeSectionId.includes(section._id) && (
              <ul className="ml-5 mt-2">
                {section.subSection?.map((subsection, subIndex) => (
                  <li
                    key={subIndex}
                    className={`block mb-1 rounded-md text-md pl-2 pr-2 ${
                      subsection._id === subSectionId ? ' bg-[#e6ffec] font-semibold text-richblack-800 ' : ''
                    }`}
                  >
                    <Link
                      to={`view-course/${course._id}/section/${section._id}/sub-section/${subsection._id}`}
                    >
                      {subsection.title.split(' ').slice(0, 3).join(' ')}...
                    </Link>
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
