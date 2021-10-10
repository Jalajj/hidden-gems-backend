const FavPlace = require('../models/FavPlace');

exports.createFav = (req, res) => {
      FavPlace.create(req.body).then((fav) => {
          res.status(200).json(fav);
      }).catch((err) => {
          res.status(400).json(err);
          console.log(err)
      }) 
}

exports.findFav = (req, res) => {
    FavPlace.find({userId:req.params.userId}).then((favPlace) => {
        if(favPlace){
            return res.status(200).json(favPlace) 
        }else{
            return res.status(401).json("Something isn't right");
            /*Two reasons for this error either fav didint exists userid isnt right*/
        }
    }).catch((err) => {
        console.log(err);
        return res.status(400).json(err)
    })
}
exports.deleteFav = (req, res) => {
    FavPlace.findOneAndDelete({userId: req.params.userId, placeId:req.params.placeId}).then((resp) => {
        return res.status(200).json(resp);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
    })
}

exports.favoritedPlace = (req, res) => {
    FavPlace.findOne({userId:req.params.userId, placeId:req.params.placeId}).then((place) => {
        if(place){
            res.status(200).json(true);
        }else{
            res.status(200).json(false);
             /*Two reasons for this error either fav didint exists userid isnt right*/
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
}