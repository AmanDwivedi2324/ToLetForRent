import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:["Admin","User","Landlord","Superadmin"],
        default:"User"
    },
    accountVerified:{
        type:Boolean,
        default:false
    }
})

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id },  
    process.env.JWT_SECRET_KEY, 
    {
      expiresIn: process.env.JWT_EXPIRE, 
    }
  );
};


export const User = mongoose.model("User",userSchema);