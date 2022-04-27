const { Router } = require("express")
const { createFood, getMenu } = require("../controllers/foodController")
const{protect, admin}=require("../middlewares/authMiddleware")


const router =Router()

router.route("/foods").post(protect, admin, createFood ).get(protect, getMenu)

module.exports=router

