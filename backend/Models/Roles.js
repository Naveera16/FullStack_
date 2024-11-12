const mongoose = require("mongoose");

const roles_Schema = mongoose.Schema(
    {
        Rolename: {type: String, require : [true, "Roles must be enter"]} ,
        Status: { type:String , require : [true , "Status Must be selected"]}
    }
)

const userRoles = mongoose.model("userRoles", roles_Schema)
module.exports = { userRoles }