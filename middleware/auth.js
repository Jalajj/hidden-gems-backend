const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv").config();
const User = require('../models/User')
const expressJwt = require("express-jwt");

exports.auth = expressJwt({
  secret: process.env.JWT_KEY,
  userProperty:"auth",
  algorithms: ['sha1', 'RS256', 'HS256']
})

exports.isAdmin = (req, res , next) => {
    User.findById(req.params.userId).then((user) => {
          if(user.role === 0){
             return res.status(403).json({error:"Admin resource! Access denied"})
          }
    })
     next();
 }

