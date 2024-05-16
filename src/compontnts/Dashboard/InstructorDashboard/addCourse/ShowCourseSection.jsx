import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../../slices/courseSlice"
import ConfirmationModal from "../../../commmon/ConfirmationModal"
import { deleteSection, deleteSubSection } from "../../../../services/operations/sectionAndSubsectionApi"
import SubSectionModal from "./SubSectionModal"
// import ConfirmationModal from "../../../../Common/ConfirmationModal"
// import SubSectionModal from "./SubSectionModal"


export default function ShowCourseSection({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)


    const handleDeleteSubSection = async(subSectionId,sectionId)=>{
        const result= await deleteSubSection({subSectionId,sectionId,token});
        if(result){
           const updatedSubSection = course.courseContents.map(section=>{
                   return section._id===sectionId?result.updatedSection:section
              })
        const updatedCourse= {...course,courseContents:updatedSubSection}
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

     const handleDeleteSection = async(sectionId)=>{
        const result = await deleteSection({sectionId,courseId:course?._id,token});
      //  console.log("result in section deltetion",result);
        if(result){
            dispatch(setCourse(result.updatedCourse));
        }
        setConfirmationModal(null);
     }

  return (
    <>
      <div className="mt-10 p-5 w-full">
      {
        course.courseContents.map((section)=>(
            //section dropdown
          
           <details key={section._id} open>
           <summary className="flex cursor-pointer w-full font-semibold items-center justify-between border-b-2 border-b-richblack-600 py-2 my-4">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-200" />
                <p className="font-semibold text-richblack-200">
                  {section.sectionName}
                </p>
              </div>
              
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: `Delete the Section '${section.sectionName}' ?`,
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section?.subSection?.map((data,index) => (
                <div 
                  key={index}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                   <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div> 
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: `Delete this Sub-Section '${data.sectionName}'?`,
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                         })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                 </div>
              ))} 
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-blue-100"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
           </details>
        ))}
      </div>

      {/* modal display */}
      {/* add subsection inside section */}
      {
        addSubSection && 
        (<div>
          <SubSectionModal modalData={addSubSection} setModalData={setAddSubsection} add={true}/>
        </div>)
      }
      {
        editSubSection && 
        (<div>
          <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>
        </div>)
      }
      {
        viewSubSection && 
        (<div>
          <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>
        </div>)
      }
      {/* edit sub section */}
      {
        confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
        )
      }
    </>
  )
}
