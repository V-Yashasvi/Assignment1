const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        min:[6, "Password should be minimum 6 characters"],
        max:[16, "Password cannot be more than 16 characters"]
    }
})

const mongoSchema=mongoose.model('schema', schema)
module.exports=mongoSchema