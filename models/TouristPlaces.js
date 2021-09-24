const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    latitude:Number,

    longitude: Number,
    
    Attractions: String,
})

const TouristPlaces = mongoose.model("TouristPlaces", placeSchema);

module.exports = TouristPlaces;