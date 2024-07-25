import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlics";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import loadingReducer from "../slices/loadingSlice";


const rootReducer = combineReducers(
    { 
        auth:authReducer,
        profile:profileReducer,
        cart:cartReducer,
        course:courseReducer,
        loading: loadingReducer,
    }
);


export default rootReducer;