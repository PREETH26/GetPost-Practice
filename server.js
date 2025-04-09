const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const User = require("./userSchema.js")
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected")
}).catch(()=>{
    console.log("Not connected")
})
app.post("/",async(req,res)=>{
    const {name,email,content} = req.body;
    if(!name||!email){
        return res.status(400).json({success:false,message:"Missing Details"})
    }
    try {
        const user = await User.create({name,email,content});
        return res.status(201).json({success:true,message:"Created Successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Server error",details:error.message})    
    }
})

app.get("/",async(req,res)=>{
    try {
        const user = await User.find();
        if(!user){
            return req.status(404).json({success:false,message:"Not found"})
        }
        return res.status(200).json({success:true,message:"Found Successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Server error",details:error.message})    
    }
})

app.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({success:false,message:"Not found"})
        }
        return res.status(200).json({success:true,message:"Found Successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Server error",details:error.message})    
    }
})

app.listen(3000,()=>{
    console.log("Running")
})

