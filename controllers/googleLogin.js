const {OAuth2Client} = require('google-auth-library');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = (req,res) => {
    const {tokenId} = req.body;
    client.verifyIdToken({idToken:tokenId, audience: process.env.GOOGLE_CLIENT_ID}).then((response) => {
        const {email_verified, name, email, picture} = response.payload;
        console.log(response.payload);
        if(email_verified){
           User.findOne({email}).then(async (user) => {
               if(user){
                const token= jwt.sign({_id:user._id},process.env.JWT_KEY, { expiresIn: "100h" });
                const {_id, username, email} = user;
                res.json({user: {_id, username, email, token}})
               }
               else{
                     let password = email+process.env.JWT_KEY;
                     const salt = await bcrypt.genSalt(10);
                     const hashedPassword = await bcrypt.hash(password, salt)
                     let newUser = await new User({username:name, email, password:hashedPassword, photo: picture});
                      newUser.save().then((data) => {
                         const token= jwt.sign({_id:data._id},process.env.JWT_KEY, { expiresIn: "7d" });
                            const {_id, name, email} = newUser;
                            res.json({user: {_id, username, email, token}});
                     }).catch((err) => {
                         res.status(400).json(err)
                         console.log(err);
                     })
               }
           }).catch((err) => {
            res.status(400).json(err)
               console.log(err);
           })  
        }
    }).catch((err) => {
        res.status(400).json(err)
        console.log(err)
    })
}

