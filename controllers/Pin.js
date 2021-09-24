const Pin = require("../models/Pin");

exports.createPin = (req,res) => {
//     const newPin = await new Pin(req.body);
//     try {
//        const savedPin = await newPin.save();
//         res.status(200).json(savedPin)
//     }catch(err){
//             res.status(500).json(err)
    //}
Pin.create(req.body).then((pin) => {
        return res.status(200).json(pin)
}).catch((err) => {
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