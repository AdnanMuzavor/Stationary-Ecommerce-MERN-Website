const express= require("express");
const app=express();
const cookieparser=require("cookie-parser");
app.use(cookieparser());

// app.use(express.bodyParser({limit:'50mb'}));

//For uploadinf files on momgodb

// const fileupload=require("express-fileupload");
// app.use(fileupload());

//Using enV to secure your details
const dotenv=require("dotenv");
dotenv.config({path:'./.env'});
const DB=process.env.DATABASE;
const port=process.env.PORT || 4000;

//To connect with mongodb online

require("./db/conn");

//Requiring model

const User=require("./models/userschema");

//Using routers in place of get functions below
app.use(express.json());
app.use(require("./routers/auth"));

//For hosting purpose
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

app.listen(port,()=>{
    console.log(`Listening to port number: ${port}`);
})