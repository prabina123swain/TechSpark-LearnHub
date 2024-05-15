import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("user");
//console.log("user ",userData);

const initialState =
    {
        user:(userData)?JSON.parse(userData):null,
        loading:false
    };
//Each slice has 3 parts name,intialstate and reducers
//reducers has all the functions to perform

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value) {
            state.user =value.payload ;
           //console.log("user ",value.payload);
        },
        setLoading(state,value){
            state.loading =value.payload ;
        }
    }
})
//to export reducers we have to export slice actions
export const {setUser,setLoading} = profileSlice.actions
export default profileSlice.reducer;
