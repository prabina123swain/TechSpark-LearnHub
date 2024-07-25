//api connector is used for connecting backend to frontend of my project

import axios from "axios";
//Axios is a Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser
//Axios is a Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser

const axiosInstance = axios.create({});

//apiConnector is a function for call backend api which require all the data like body,url,header

export const apiConnector = (method , url , bodyData, headers, params )=>{
   console.log("body data" ,bodyData);
    return axiosInstance({
        method:`${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers:headers?headers:null,
        params:params?params:null
});
}
