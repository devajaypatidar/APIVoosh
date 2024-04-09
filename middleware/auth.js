const jwt = require("jsonwebtoken");
const user = require("../models/User");

const verifyToken = (req,res,next)=>{
    const token = req.headers["authorization"];
    
    if(!token){
        return res.status(401).json({message:"no token Provided"});
    }   

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:"Failed to Authenticate Token"});

        }
        req.user = decoded.user;
        next();
    })


}

module.exports = verifyToken;