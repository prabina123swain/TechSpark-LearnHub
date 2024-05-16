import { createSlice } from "@reduxjs/toolkit"

const intialstate ={
    loading:false,
    course:null,
    step:1,
    editCourse:false
}

const courseSlice = createSlice({
    name:"course",
    initialState:intialstate,
    reducers:{
       setCourse(state,value){
        state.course=value.payload;
      //  console.log("course in slice ",state.course);
       },
       setStep(state,value){
        state.step=value.payload;
       },
       setEditCourse(state,value){
        state.editCourse=value.payload;
       }
    }
})

export const {setCourse ,setStep ,setEditCourse} =courseSlice.actions
export default courseSlice.reducer;
