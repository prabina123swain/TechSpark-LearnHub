const Category = require("../models/Category");
const Course = require("../models/Course");

//Category is created by admin  
exports.createCategory= async(req,res) => {
    try{
    // console.log("request data " ,req.body);
    //take Category details from req body 
    const {name,description}=req.body;
    //data validation
    if(!name || !description){
        return res.status(500).json({
            success:false,
            message:"All fields are required", 
        })
    }
    //check if category id is elredy exist or not
    const isExist= await Category.findOne({name:name});
    if(isExist){
        return res.status(200).json({
            success:false,
            message:"Category name is alredy exist  ",
          })
    }
    //insert Category details to DB
    const categoryDetails=await Category.create({name,description});

   // console.log("Category details ->",categoryDetails);
    return res.status(200).json({
        success:true,
        message:"Category created and inserter to DB successfully ",
        CategoryData:categoryDetails
      })
    }
    catch(err){
        console.log("error in creating Category ",err.message);
        return res.status(500).json({
            success:false,
            message:"Category creation failed ",
        })
    }
}

exports.showAllCategory = async(req,res) => {
    try{
    //Find all ta details whose name and description must present
     console.log("req body =>",req.body); 
    const allCategories=await Category.find({},{name:true,description:true});
  
    //console.log("All Categories  ->\n",allCategories);
    
    return res.status(200).json({
        success:true,
        message:"All Category details fetched successfully ",
        allCategories
      })
    }
    catch(err){
        console.log("error in fetching all Category ",err.message);
        return res.status(500).json({
            success:false,
            message:"All Category details fetching failed ",
        })
    }
}

exports.categoryPageDetails = async (req,res) =>{
    try{
        console.log("Love ");
        const {categoryId} = req.body;
        console.log("request body " ,req.body);

        if(!categoryId) {
            return res.status(200).json({
                success:false,
                message:"Category Id required "
            })
        }
        //find the category of the given id
        const category = await Category.findById(categoryId).populate("courses").exec();
        if(!category){
            return res.status(403).json({
                success:true,
                message:"No deta found for given category ",
              })
        }
        //  console.log("current category ",category);
        //find all other category data exoist except this category 
        const otherCategories = await Category.find({_id:{$ne:categoryId}}).populate("courses").exec();

         //  console.log("Other categories courses are ",otherCategories);
        //find top selling courses 
        //this query is for finding size of students enrolled in the course in each course and sort according to the count

        const topSellingCourses = await Course.aggregate([
            { 
              $addFields: { 
                studentCount: { $size: "$studentsEnrolled" } 
              } 
            },
            { 
              $sort: { studentCount: -1 } 
            },
            { 
              $limit: 10 
            }
          ]);
          
          
    //   console.log("top selled course ",topSelledCoures);
        
       return res.status(200).json({
        success:true,
        message:"Category details finds successfully ",
        categoryCourses:category.courses,
        otherCategoriesCoures:otherCategories.courses,
        topSellingCourses:topSellingCourses
       })
    }
    catch(err){
        console.log("Error in retriving category details ",err.message);
        return res.status(200).json({
            success:false,
            message:"Category details fetching failed ",
        })
    }
}