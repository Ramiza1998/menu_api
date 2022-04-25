const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:Date,
        default:Date.now()
    }}

  
)

const User = mongoose.model("User", userSchema)
module.exports=User;


