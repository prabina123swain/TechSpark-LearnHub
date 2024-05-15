import { createSlice } from "@reduxjs/toolkit";

//if any value of token exists in local storage get the value 

const val=localStorage.getItem("token");
console.log("token",val);
const initialState =
    {
        signUpData: null,
        loading: false,
        token:(val)?JSON.parse(val):null
    };
//Each slice has 3 parts name,intialstate and reducers
//reducers has all the functions to perform

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value) {
            state.token =value.payload ;
           console.log("token ",state.token);
        },
        setSignUpData(state, value){
          state.signUpData = value.payload;
        },
        setLoading(state,value){
          state.loading= value.payload;
        }
    }
})
//to export reducers we have to export slice actions
export const {setToken , setLoading ,setSignUpData} = authSlice.actions
export default authSlice.reducer;
