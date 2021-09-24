const User = require("../models/User");
const bcrypt = require("bcrypt");

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
      const user = await newUser.save();
      res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
}
//Login 
exports.userSignIn = async (req,res) => {
   try{
       const existingUser = await User.findOne({username: req.body.username});
       if(!existingUser){
           res.status(400).json("Invalid Credentials")
       }else{
           const validPassword = await bcrypt.compare(req.body.password, existingUser.password)
           if(!validPassword){
            res.status(400).json("Invalid Credentials")
           }
           res.status(200).json(existingUser)
       }

   }catch(err){
       res.status(500).json(err)
   }
}