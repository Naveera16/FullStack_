const { userRoles } = require("../Models/Roles")

//------API : "http://localhost:5000/roles"
//------------Method :POST
async function createRoles(req, res) {
    const { Rolename,
        Status } = req.body

    // check if role exists
    const roleExists = await userRoles.find({ Rolename: Rolename.toLowerCase() })
    // No spaces or spcial characters or numbers
    const roleName_Checker = /^[A-Za-z]+$/;
    if (roleName_Checker.test(Rolename)) {
        if (roleExists.length > 0) return res.send({ "error": "Role Already Exists" })
        const Role = await userRoles.create({
            Rolename: Rolename.toLowerCase(),
            Status: Status
        })
        return res.status(201).send({ "Data": req.body })
    }
    else {
        return res.status(500).send({ "error": "Special chracter , extra spaces or numbers are not allowed" })
    }
}


//------API : "http://localhost:5000/roles"
//------------Method :GET
async function getRoles(req, res) {
    const AllRoles = await userRoles.find();
    return res.status(201).send({ "data": AllRoles })
}


module.exports = { getRoles, createRoles }