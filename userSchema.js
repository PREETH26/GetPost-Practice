const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        unique:true,
        type:String,
        required:true,
        match: [/\S+@\S+\.\S+/ ,"Please enter email again"]
    },
    content:{
        type:String,
        enum:["Short","Medium","Lengthy"]
    }
})

module.exports = mongoose.model("User",user);