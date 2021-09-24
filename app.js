const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRouter = require("./routes/pin")
const userRouter = require("./routes/user")
const travelPlaceRouter = require("./routes/touristPlaces")
dotenv.config()
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}



const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const port = 7000 || process.env.PORT;

//routers
app.use("/pins",pinRouter);
app.use("/user",userRouter);
app.use("/tourists/guide", travelPlaceRouter)

//image upload



mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology:true}).then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
})

app.listen(port , () => {
    console.log("Server started on ",port);
})