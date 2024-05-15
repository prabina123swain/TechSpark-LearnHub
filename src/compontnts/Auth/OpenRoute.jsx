import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


function OpenRoute({children}) {
    const {token} = useSelector(state=>state.auth);
    //console.log(token);
    if(token===null){
        return children;
    }
    else{
        let url=localStorage.getItem("targetUrl");
             url= !url ? "/dashboard/my-profile" : url;
             console.log(url);
        return  <Navigate to={url} />
    }
}

export default OpenRoute