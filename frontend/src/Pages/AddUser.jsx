import React, { useEffect, useState } from 'react'

const AddUser = () => {

    //-------Roles
    const [Roles, setRoles] = useState([])
    useEffect(() => {
        // ----Fetching roles from backend
        const fetchingRoles = async () => {
            try {
                const Response = await fetch("http://localhost:5000/roles");
                const fetchRoles = await Response.json()
                if (Response.status === 201) {
                    setRoles(fetchRoles.data)
                }
            } catch (error) {
                console.log({ "Error": error })
            }

        }
        fetchingRoles()
    })

    //--------input fields
    const [UserName, setUserName] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserRole, setUserRole] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [UserImage, setUserImage] = useState("")

    const HandleSubmit =async (e) => {
        e.preventDefault()
        console.log(UserImage)
        if (UserName == "" || UserEmail == "" || UserRole == "none" || UserPassword == "" || UserImage == "") {
            alert("Fill the form first!")
        }
        else {
            const newUser ={
                userName : UserName,
                userEmail : UserEmail,
                userImage : UserImage,
                userPassword : UserPassword,
                userRole : UserRole
            }
    try {
         const Response = await fetch("http://localhost:5000/",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                  },
                  body: JSON.stringify(newUser)
            })
            if (Response.status === 201) { //-------Respone.status ===201
                // toast.success("Role Added")
                alert("User Added")
              }
    } catch (error) {
        alert(error)
    }
           
             
        
        }
    }

    return (
        <>
            <div className="container mt-3 d-flex flex-column  align-items-center ">
                <h1 className="text-center mt-3 ">
                    Add User
                </h1>
                <form method='post' enctype="multipart/form-data" onSubmit={HandleSubmit} className='w-50'>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={(e) => setUserEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                        <input name='UserImage' onChange={(e) => setUserImage(e.target.value)} type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                        <select onChange={(e) => setUserRole(e.target.value)} name="" id="" className="form-select">
                            <option value="none">Select Role</option>
                            {
                                Roles.map((data, index) => {
                                    return (
                                        <option value={data.Rolename}>{data.Rolename}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={(e) => setUserPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary "><i className="fa-solid fa-plus"></i> Add User</button>
                </form>
            </div>
        </>
    )
}

export default AddUser
