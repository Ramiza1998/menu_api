const { Router } = require ("express")

const {createUser} = require("../controllers/userController")

const router =Router()

router.post("/users", createUser)


module.exports=router