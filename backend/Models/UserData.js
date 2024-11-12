const mongoose = require("mongoose");

const userData_Schema = mongoose.Schema(
    {
        userName: {type: String, require : [true, "Name Required"]} ,
        userEmail: { type:String , require : [true , "Email Requiered"]},
        userImage: { type:String , require : [true , "Image Requiered"]},
        userPassword: { type:String , require : [true , "Password Requiered"]},
        userRole: { type:String , require : [true , "Role Requiered"]}
    }
)

const userData = mongoose.model("userData", userData_Schema)
module.exports = { userData }