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

const Food = mongoose.model("Food", userSchema)
module.exports=Food;


