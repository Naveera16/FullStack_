 const mongoose = require("mongoose");

 async function connectionDB (){
    try {
        const connectDB = await mongoose.connect(process.env.DB)
        if(connectDB)console.log("~~ Mongo DB Atlas connected successfully!!  ~~")
    } catch (error) {
        console.log({"Error" : error})
    }
 }


 module.exports = { connectionDB}