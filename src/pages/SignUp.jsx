import Footer from '../compontnts/commmon/Footer'
import Template from '../compontnts/Auth/Template'

const signUpData =[
  {
    levelFor:"First Name",
    type:"text",
    placeholder:"Enter first name",
    id:"email",
    name:"firstName"
   },
   {
    levelFor:"Last Name",
    type:"text",
    placeholder:"Enter last name",
    id:"lastname",
    name:"lastName"
   },
  {
    levelFor:"Email Address",
    type:"text",
    placeholder:"Enter email address",
    id:"email",
    name:"email"
   },
   {
    levelFor:"Create Password",
    type:"password",
    placeholder:"Enter password",
    id:"password",
    name:"password",
   },
    {
    levelFor:"Confirm Password",
    type:"password",
    placeholder:"Enter password",
    id:"password",
    name:"confirmPassword",
   },
]

function SignUp() {
  console.log("inside sign up ");
  return (
    <div>
    <Template data={signUpData} formType={"signUp"}/>
    <div>
      <Footer />
    </div>
  </div>
  )
}

export default SignUp