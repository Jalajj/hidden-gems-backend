const mongoose = require("mongoose");

const pinSchema  = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        min:4
    },
     
    description: {
        type:String,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    latitude: {
        type:Number,
        required:true
    },
    longitude: {
        type:Number,
        required:true
    }
    
}, {timestamps:true});

module.exports = mongoose.model("Pin", pinSchema);