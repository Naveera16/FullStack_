const express = require("express")
const app = express()

// -----------env
require("dotenv").config()


//---------MIDDLEWEARAS
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//---DATABASE
const {connectionDB} = require("./Config/Database")

// --User Role API {GET, POST}
const {getUser,createUser} = require("./Controllers/UserDataController")


//---app route
//-------UserData
app.route("/").get(getUser).post(createUser)


///---Roles API (GET,POST)
const{ getRoles,createRoles } = require("./Controllers/RolesController")
//----Roles
app.route("/roles").get(getRoles).post(createRoles)



//---server listen
app.listen(process.env.PORT,function(){
    console.log(`Server is working on ${process.env.PORT} port`)
    connectionDB()

})


