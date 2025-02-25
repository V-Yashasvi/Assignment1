const express=require('express')
const Schema=require('../model/sample.model')
const router=express.Router()

router.get('/get', async(req, res)=>{
    try {
        const data=await Schema.find()
        if(!data){
            return res.status(400).json({"message":"Could not find data"})
        }
        res.status(200).json({"message":"Successfully fetched the data", data})
        console.log("Success")
    } catch (error) {
        res.status(500).json({"error":error.message})
        console.log(error)
    }
})

router.get('/get/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const data=await Schema.findById(id)
        if(!data){
            return res.status(400).json({"message":"Could not find data"})
        }
        res.status(200).json({"message":"Successfully fetched the data", data})
        console.log("Success")
    } catch (error) {
        res.status(500).json({"error":error.message})
        console.log(error)
    }
})

router.post('/post', async(req, res)=>{
    const {name, email, password}=req.body
    if(!name|| !email|| !password){
        return res.status(400).json({"message":"Name, email and password are must"})
    }
    if (!email.includes('@')){
        return res.status(400).json({"message":"Email must include '@'"})
    }
    if(password.length<6 || password.length>16){
        return res.status(400).json({"message":"Password must be minimum 6 characters and should not exceed 16 characters"})
    }
    const payload={name, email, password}
    try {
        const new_data=new Schema(payload)
        await new_data.save()
        if(!new_data){
            return res.status(400).json({"message":"Failed to save new data"})
        }
        res.status(201).json({"message":"Successfully created a new data", new_data})
    } catch (error) {
        res.status(500).json({"error":error.message})
        console.log(error)
    }
})

router.put('/put/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const new_name=await Schema.findByIdAndUpdate(id, req.body, {new:true})
        if(!new_name){
            return res.json({"message":"Failed to updated user"})
        }
        res.status(200).json({"message":"Sucessfully updated the user", new_name})
    } catch (error) {
        res.status(500).json({"error":error.message})
        console.log(error)
    }
})

router.patch('/patch/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const new_data=await Schema.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        if(!new_data){
            return res.json({"message":"Failed to updated user"})
        }
        res.status(200).json({"message":"Sucessfully updated the name", new_data})
    } catch (error) {
        res.status(500).json({"error":error.message})
        console.log(error)
    }
})

router.delete('/delete/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const delete_data=await Schema.findByIdAndDelete(id)
        if(!delete_data){
            return res.json({"message":"Could not delete the data"})
        }
        res.status(200).json({"message":"Successfully deleted the data", delete_data})
    } catch (error) {
        res.status(500).json({"error":error.message})
        console.log(error)
    }
})

module.exports=router