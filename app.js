const express= require("express");
const app=express();

//For using cookies for storing token
const cookieparser=require("cookie-parser");
app.use(cookieparser());


//Using enV to secure your details
const dotenv=require("dotenv");
dotenv.config({path:'./.env'});

//Getting DB and port no from env
const DB=process.env.DATABASE;
const port=process.env.PORT || 6000;

//To connect with mongodb online

require("./db/conn");

//To make browser accept json files
app.use(express.json());

//Using routers in place of get functions below
app.use(require("./routers/auth"));


//For hosting purpose
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

//Listening to backend port
app.listen(port,()=>{
    console.log(`Listening to port number: ${port}`);
})