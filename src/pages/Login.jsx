import React from 'react';
import Footer from '../compontnts/commmon/Footer';
import Template from '../compontnts/Auth/Template';

//import { Link } from 'react-router-dom';
const logInData =[
   {
    levelFor:"Email ",
    type:"text",
    placeholder:"Enter email address",
    id:"email",
    name:"email"
   },
   {
    levelFor:"Password",
    type:"password",
    placeholder:"Enter password",
    id:"password",
    name:"password"
   },
]

function Login() {
  return (
    <div className='' >
    <Template data={logInData} formType={"sign In"} />
    <div>
      <Footer />
    </div>
    </div>
  );
}

export default Login;
