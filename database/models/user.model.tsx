import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    fullname: {type:String, required:true},
    isAdmin: {type:Boolean, required:true, default:false},
    isHospital: {type:Boolean, required:true, default:false},
});

const User= mongoose.models.User || mongoose.model('User', userSchema);

export default User;