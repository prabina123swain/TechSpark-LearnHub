const express = require("express");
const router = express.Router();

//import all middlewares
const {auth ,isInstructor ,isStudent ,isAdmin} = require("../middlewares/auth");


const {
    createCourse,
    showAllCourses,
    getFullCourseDetails,
    getInstructorCourseDetails,
    deleteCourse,
    editCourseDetails,
    getStudentCourseDetails,
    getCourseDetails
} = require("../controllers/Course");

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection");

const {
   createCategory,
   showAllCategory,
   categoryPageDetails
} = require("../controllers/Category");

const {
    createRatings,
    getAllRatings,
    getAvgRatings
} = require("../controllers/RatingAndReview");



//course router 
//create course can only be accessible for instructor

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourses",showAllCourses);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourseDetails);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);
router.post("/editCourse",auth,isInstructor,editCourseDetails);

//  course details can be accessed by student ans instructo
router.get("/getStudentCourses",auth,isStudent,getStudentCourseDetails);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);

//section is created only by instructor

router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);


// router used by all

router.post("/getCourseDetails",getCourseDetails);

//subsection is created only by instructot

router.post("/addSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection);

//category is created only by admin
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);

//ratings and reviews are given by students
router.post("/create-review",auth,isStudent,createRatings);
router.get("/all-reviews",getAllRatings);
router.get("/average-ratings",getAvgRatings);

module.exports =router;