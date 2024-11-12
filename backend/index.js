const express = require("express")
const app = express()

// -----------env
require("dotenv").config()

//------CORS
const cors = require("cors")

//---------MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const {ImageUpload , ImageDelete} = require("./Middlewares/ImageUpload");
// const{ImageDelete} = require("./Middlewares/ImageUpload")
const upload = ImageUpload();
// const deletIMG = ImageDelete()
//---DATABASE
const {connectionDB} = require("./Config/Database")

// --User Role API {GET, POST ,  DELETE ,PUT}
const {getUser,createUser , deleteUser , updateUser} = require("./Controllers/UserDataController")


//---app route
//-------UserData (API : "http://localhost:5000/")
app.route("/").get(getUser).post(upload.single('userImage'),createUser)
//---app route
//-------UserData (API : "http://localhost:5000/:id")
app.route("/:id").delete(ImageDelete,deleteUser).put(upload.single('userImage'),updateUser)


///---Roles API (GET,POST)
const{ getRoles,createRoles } = require("./Controllers/RolesController")
//----Roles
app.route("/roles").get(getRoles).post(createRoles)



//---server listen
app.listen(process.env.PORT,function(){
    console.log(`Server is working on ${process.env.PORT} port`)
    connectionDB()

})


