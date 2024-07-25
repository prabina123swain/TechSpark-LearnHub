import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import {  findAllCategoryDeatails } from "../../services/operations/CategoryPageData";
import CategoryCourses from "./CategoryCourses";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../slices/loadingSlice";

const AllCategories = () => {
  const [currentCategory, setCurrentCategory] = useState({ name: null, description: null });
  const [allCategories, setAllCategories] = useState(null);

 // let { categoryName } = useParams();
  const dispatch = useDispatch();
 
  async function fetchCategories() {
    dispatch(showLoading());
    const result = await findAllCategoryDeatails(dispatch);
    console.log("categories are ", result);

    if (result && result.length > 0) {
      setAllCategories(result);
      setCurrentCategory(result[0]);
    }

    dispatch(hideLoading());
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function setCurrentCategoryAndDescription(category) {
    setCurrentCategory(category);
  }

  return (
    <div className="p-4 mx-auto">
      <h1 className="flex justify-center items-center p-5 text-richblack-900 w-full text-3xl font-medium">
        Find a career that works for you
      </h1>

      <div className="flex flex-wrap items-center border-2 border-richblack-50 border-opacity-20 shadow-md bg-white bg-opacity-75 mt-4 mb-4 p-6 space-x-2">
        {allCategories &&
          allCategories.map((category, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 text-lg font-medium ${
                currentCategory.name === category.name
                  ? " text-yellow-100"
                  : `text-richblack-200`
              }`}
              onClick={() => setCurrentCategoryAndDescription(category)}
            >
              {category.name}
              {currentCategory.name === category.name && (
                <div className="h-1 w-1/2 bg-blue-100"></div>
              )}
            </div>
          ))}
      </div>

       <div className="flex gap-8 bg-[#1e213f] p-6 rounded-lg text-white items-center leading-7 min-h-[200px] ">
        <div className="text-3xl font-bold">{currentCategory.name}</div>
        <div>{currentCategory.description}</div>
      </div>
      {
      currentCategory.name!==null && <CategoryCourses categoryId={currentCategory._id}/>
      }
      
    </div>
  );
};

export default AllCategories;
