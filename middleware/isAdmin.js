
const isAdmin = (req,res,next)=>{
    if(req.user.isAdmin ){
        return next();
    }else{
        return res.status(403).json({message:"You are not authorized to access this resource"});

    }

}

module.exports = isAdmin;