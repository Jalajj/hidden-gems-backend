const mongoose = require("mongoose");

const favSchema  = new mongoose.Schema({
   userId: {
       type:mongoose.SchemaTypes.ObjectId,
       ref:'User'
   },
   placeName:{
       type:String,
       unique:true 
    },

   placeType:String,

   placeAddress: {
       type: String
    },
   placeLat: {
       type:Number,
       unique:true,
       required:true
    },

   placeLng:{
    type:Number,
    unique:true,
    required:true
   },

   placeId: String,

   placeImage: String,

   placeWeb: String

}, {timestamps:true});

module.exports = mongoose.model("FavPlace", favSchema);