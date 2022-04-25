const User = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const validate = require("../config/validator")
const  {generateToken}=require("../utils/generateToken")


//create a new user

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const valid = await validate({ username, email, password });
    


if (valid) {
    const hashedPassword = await bcrypt.hash(valid.password, 10);
    const user = await User.create({
    username,
    email,
    password:hashedPassword,
    });

    if (user) {
        res.status(201).json({
            name: user.name,
            email:user.email,
            id:user._id,
            token:generateToken(user._id)
    });

}  



res.status(201).json({
    message: "User created successful",
    user,
});
}else{
    res.status(400).json({
        message:"invalid data"
    })

}
};
module.exports={createUser}