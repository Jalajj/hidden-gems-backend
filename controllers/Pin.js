const Pin = require("../models/Pin");

exports.createPin = (req,res) => {
Pin.create(req.body).then((pin) => {
        return res.status(200).json(pin)
}).catch((err) => {
        console.log(err)
       return res.status(500).json(err)
})
}

exports.getPins = async function (req, res){
   const allPin = await Pin.find();
   try {
    res.status(200).json(allPin)
 }catch(err){
         res.status(500).json(err)
 }
}
exports.getUserPin = (req,res) => {
        Pin.find({userId:req.params.userId}).then((pinPlace) => {
                if(pinPlace){
                    return res.status(200).json(pinPlace);
                }else{
                    return res.status(401).json("Something isn't right");
                }
            }).catch((err) => {
                console.log(err);
                return res.status(400).json(err);
            });
}