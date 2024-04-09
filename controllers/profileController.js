const User = require("../models/user");
const getAllProfile = async (req,res,next)=>{
    try{

        const users = await User.find();
        const userData = users.map(user=>({
            email:user.email,
            isAdmin:user.isAdmin,
            isProfilePublic:user.isProfilePublic,
            profile:user.profile,
        }));
        res.json(userData);
    }catch(error){
        next(error);
    }
}

const getPublicProfile = async (req,res,next)=>{
    const users = await User.find();
    const publicProfile = users.filter(user=>user.isProfilePublic === true)
    res.json(publicProfile);
}

const updateUser = async (req,res,next)=>{

    const userId = req.user._id;
    const {email,isAdmin,isProfilePublic,bio,phone,name} = req.body;

   
    let user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (email) user.email = email;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    if (isProfilePublic !== undefined) user.isProfilePublic = isProfilePublic;
    if (bio) user.profile.bio = bio;
    if (phone) user.profile.phone = phone;
    if (name) user.profile.name = name;

    user = await user.save();

    res.json({message:"user Data is Updated Successfully",user});
}

const getProfile = async (req, res,next) => {
    
    const user = await User.findById(req.user._id);
    // console.log(user._id);
    res.json(user);
}

module.exports = {
    getAllProfile,
    getPublicProfile,
    updateUser,
    getProfile,
}