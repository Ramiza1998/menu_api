
const express = require("express");
const morgan = require("morgan");
require("dotenv").config()
const connectDB = require("./config/connectDB");
const foodRoute = require("./routes/foodRoute")


const app = express()

connectDB()
//middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use(foodRoute)

const PORT = process.env.PORT||9000
//home route
app.get("/", (req, res)=>{
    res.json("Welcome to my Menu API")
})


app.listen(PORT, ()=>{
    console.log("SERVER IS UP!!!")
})
