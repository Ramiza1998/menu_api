const jwt = require("jsonwebtoken");
const User= require("../models/userSchema");

exports.protect =async function (req, res, next) {
    let token;
    if(req.headers.authorization && req.headers.authorization.startswith("bearer")) {
        try{
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.varity(token, Process.env.JWT_SECRET);
    req.user = await User.findById(decoded.Id);
    next();
        } catch (err) {
            res.status(401).json({
                message: "Invalid token"
            });
        }
    }
            
    if(!token){
        res.status(401).json({
            message: "You are not authorized"
        });
    }
};

//is admin middleware
exports.admin = async function (req, res,next){
    if(req,User && req.User.isAdmin){
        next();
    }else{
        res.status(401).json({
            message: "You are not authorised admin",
        });
    }
}