const {bcrypt} = require("bcrypt")
const { userData } = require("../Models/UserData")

async function createUser(req, res) {
    const {
        userName,
        userEmail,
        userImage,
        userPassword,
        userRole
    } = req.body
    const checkData = await userData.find({userEmail : userEmail})
    if( checkData.length > 0) return res.send({"error" : "Email already Exists"})
        namePattern = /^[A-Za-z]{3,}$/;
     // only alphabets more then 3 letter
     const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/; // Only gmail, yahoo, hotmail
    //   const imagePattern = /^(http|https):\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif)$/; // URL pattern for images 
    //   const rolePattern = /^[A-Za-z]+$/;   
if(namePattern.test(userName)){
            if(emailPattern.test(userEmail)){
const PasswordHash = await bcrypt.hash(userPassword,10)
                const Data = await userData.create({
                    userName: userName,
                    userEmail: userEmail,
                    userImage: userImage,
                    userPassword: PasswordHash,
                    userRole: userRole
                })
                return res.status(201).send({"data" : req.body})
            }
            else{
                return res.status(500).send("Only gmail, yahoo, hotmail  accepted")}
            }
else{
return res.status(500).send("Name should contain only Alphabets, length should be more than 3 letters ")
}

}


async function getUser(req, res) {
    const UserData = await userData.find()
    return res.status(201).send({ "data": UserData })
}

module.exports = { getUser, createUser }