const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

const googleLogin = passport.authenticate('google',{scope:['profile','email']})

const googleCallback = passport.authenticate('google',{
  failureRedirect:'/login'
},
(req,res)=>{
  res.json({message:"you are logged"});
})

const logout = (req, res)=>{
  req.logout();
  res.json({message:"you are logged out"});
}

const registerController = async (req, res, next) => {
    try {
      const { email, password,isAdmin, isProfilePublic,name,bio,phone} = req.body;
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin || false, 
        isProfilePublic: isProfilePublic || true, 
        profile: {
          name: name || '',
          bio: bio || '',
          phone: phone || ''
        }
      });
      console.log(newUser);
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
  }

  const loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ user: user}, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }



  module.exports = {
    registerController,
    loginController,
    googleLogin,
  googleCallback,
  logout
  }