import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../../slices/courseSlice"
import Upload from "./Upload"
import IconBtn from "../../../commmon/IconBtn"
import { createSubSection, updateSubSection } from "../../../../services/operations/sectionAndSubsectionApi"


export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  // console.log('modal data ',modalData);
  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
   // console.log("modalData", modalData)
   //setModalData(null);
   if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }

 const handleCreateSubsection= async(data)=>{
   setLoading(true)
   // console.log(data.lectureDesc,data.lectureTitle,data.lectureVideo);
    let result  = await createSubSection(
      {
          title:data.lectureTitle,
          description:data.lectureDesc,
          sectionId:modalData,
          video:data.lectureVideo
            , token})

  if (result) {
    // update the structure of course
    //console.log("priviously course content-> ",course.courseContents,modalData);
    const updatedCourseContents = course.courseContents.map((section) =>
                       section._id === modalData ? result.updatedSection : section)
        
   // console.log("updated course content-> ",updatedCourseContents,"course\n",course);
    const updatedCourse = { ...course, courseContents: updatedCourseContents }
    dispatch(setCourse(updatedCourse))
   //console.log("updated course content ",course.courseContents);
  }
  setModalData(null)
  setLoading(false)
 }

  // handle the editing of subsection
  const handleEditSubsection = async (data) => {
    //console.log(data);
    let title,description,video;   
    console.log(modalData,"\n",data);
    if(modalData.title!==data.lectureTitle){
      title=data.lectureTitle;
     // console.log(title);
    }
    if(modalData.description!==data.lectureDesc){
      description=data.lectureDesc;
    }
    if(modalData.videoUrl!==data.lectureVideo){
      video=data.lectureVideo;
     // console.log(data.lectureVideo);
    }
    
    setLoading(true)
    let result =await updateSubSection({subSectionId:modalData._id,title,description,video,sectionId:modalData.sectionId,token}); 
    if (result) {
       console.log("result", result.updatedSection);
      // update the structure of course
      const updatedCourseContents = course.courseContents.map((section) =>
        section._id === modalData.sectionId ? result.updatedSection : section
      )
      const updatedCourse = { ...course, courseContents: updatedCourseContents}
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        setModalData(null);
      }
       else 
        handleEditSubsection(data)
    }
    else{
      handleCreateSubsection(data);
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-600">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-white">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
