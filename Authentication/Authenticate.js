const jwt= require("jsonwebtoken");
const User=require("../models/userschema");

const Authenticate=async(req,res,next)=>{
try {
    console.log("inside authenticate");
    //getting token stored in cookies while sigining in
    const token=req.cookies.jwttoken;

    //If token is correct it'll return id of user along with token stored in database
    const verify= jwt.verify(token,process.env.SECRET_KEY);
    console.log(`output of verify fn:->${verify}`);

    //If token returns a proper id,getting the user with id returned by verify function and storing token in tokens array
    const getuser=await User.findOne({_id:verify._id,"tokens.token":token});
    console.log(`output of getuser fn:->${getuser}`);
  
    //If user is not found with help of id returned means user doesnt exist as no such document in database has the gievn id
    if(!getuser){
    throw new Error('User not found');
     }

    //getuser will have entire user data from database which now can be accessed
    //Asssinging this data to req.variables to send as response when abput page 
    //is requested
    req.token=token;
    req.getuser=getuser;
    req.Userid=getuser._id;
    req.cartitems=getuser.items;
    // req.blogs=[getuser.blogs];

    next();
} catch (err) {
    res.status(401).send("Unauthorised access");
    console.log(err);
    
}
}

module.exports=Authenticate;