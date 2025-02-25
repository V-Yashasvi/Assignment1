const express=require('express')
const app=express()
const mongoose= require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const mongoURL=process.env.URL
const port=process.env.PORT
const router=require('./routes/sample.route')
app.use(express.json())

const connection=mongoose.connect(mongoURL).then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err)=>{
    console.log(err)
})

app.use('/router', router)

app.listen(port, async()=>{
    try {
        await connection
        console.log(`Service is running on http://localhost:${port}`)
    } catch (error) {
        console.log(error)
    }
})
