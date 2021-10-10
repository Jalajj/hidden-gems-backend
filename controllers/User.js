const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

exports.userRegister = async (req,res) => {
    try{
        //generating hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
         
      const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password:hashedPassword
      })
      //savig user
      await newUser.save();
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_KEY, { expiresIn: "100h" });

      res.status(200).json({ result: newUser, token });
    }catch(err){
     
        console.log(err);
        return res.status(500).json(err);
    }
}
//Login 
exports.userSignIn = async (req,res) => {
   try{
       const existingUser = await User.findOne({email: req.body.email});
       if(!existingUser){
           res.status(400).json("Invalid Credentials");
           return;
       }else{
           const validPassword = await bcrypt.compare(req.body.password, existingUser.password)
           if(!validPassword){
            res.status(400).json("Invalid Credentials");
            return;
           }
           const token = await jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_KEY);
           res.cookie('t', token ,{ expire : new Date() + 9999});
          return res.status(200).json({token, 
            _id:existingUser._id,
            username:existingUser.username,
            admin:existingUser.admin,
            email: existingUser.email });
       }
   }catch(err){
    console.log(err)
      return res.status(500).json(err);
  
   }
}

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({message: "Signed out successfully"})
}