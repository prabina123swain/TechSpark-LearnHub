const mongoose=require("mongoose");
require("dotenv").config();

const databaseConnect =()=> mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{
    console.log("DataBase connected successfully");
  })
  .catch((err)=>{
    console.log("error in connecting db: ",err.message);
    process.exit(1);
  })

module.exports=databaseConnect ;