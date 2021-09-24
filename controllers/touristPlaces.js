const TouristPlaces = require("../models/TouristPlaces")
// const fs = require('fs');

exports.create = (req,res) => {
   TouristPlaces.create(req.body).then((place) => {
    //    place.image.data = fs.readFileSync(req.files.userPhoto.path);
    //    place.image.contentType = 'image/png';
       return res.status(200).json(place) 
    }).catch((err) => {
           console.log(err);
           return res.status(400).json(err)
       })
}

exports.getAllPlaces = (req,res) => {
    TouristPlaces.find({}).then((places) => {
        return res.status(200).json(places);
    }).catch((err) => {
        console.log(err);
    })
}

exports.getPlace = (req, res) => {
    TouristPlaces.findOne({_id: req.params.placeId}).then((place) => {
        return res.status(200).json(place)
    }).catch((err) => {
        console.log(err)
        return res.status(400).json(err)
    })
}
exports.deletePlace = (req,res) => {
    TouristPlaces.findByIdAndRemove(req.params.placeId).then((resp) => {
        return res.status(200).json(resp);
    }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
    })
}
 
exports.updatePlace = async (req,res) => {
    try{
        const getPlace = await TouristPlaces.findOne({_id:req.params.placeId});
        if(getPlace){
            if(getPlace.user === req.params.userId){
               const updatePlace = await Posts.findByIdAndUpdate(req.params.placeId, {
                        $set:req.body
                    }, {new:true});
                    res.status(200).json(updatePlace)
            }else{
                res.status(401).json("You are not authorised to update the Place");
            }
        }else{
            res.status(404).json("Place not found")
        }
    }catch(err){
      console.log(err);
      res.status(500).json({error: "Something went wrong"});
    }
}