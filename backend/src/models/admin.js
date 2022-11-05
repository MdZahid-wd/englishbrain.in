const mongoose=require('mongoose');

const admin=mongoose.Schema(
    {
        email:String,
        name:String,
        phone:String,
        password1:String,
        course:Number,
    }
)
module.exports=mongoose.model('admins',admin);