import React, { useEffect, useRef, useState } from 'react'
import { Modal } from "bootstrap";
const UserList = () => {
    // -----UserLIST
    const [UserList, setUserList] = useState([])
const [Roles,setRoles] = useState([])
    useEffect(() => {
        // --- Fetching Data from Backend
        const fetchingData = async () => {
            try {
                const Response = await fetch("http://localhost:5000/") // ---------Backend API 
                const fetchData = await Response.json()
                if (Response.ok) {
                    setUserList(fetchData.data)
                }

            } catch (error) {
                console.log({ "Error": error })
            }

        }
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
        fetchingData()
    })
// -------Delete functionality
    const DeleteUser = async (ID)=>{
try {
    const Response =await fetch(`http://localhost:5000/${ID}`,{
        method : "DELETE"
    })
    if (Response.status === 201) {
        alert("User deleted")
        // toast.success(`Role Deleted`);
    } else {
        const checkerror = await Response.json() //-----Response.status===500
alert(`Error ${Response.status} : ${checkerror.error} `)

        // toast.error(`Error :${Response.status} ${checkerror.error}`);
    }
} catch (error) {
    console.log({"Error" : error})
}
    }
 //--------input fields
 const [UserID, setUserID] = useState("")
 const [UserName, setUserName] = useState("")
 const [UserEmail, setUserEmail] = useState("")
 const [UserRole, setUserRole] = useState("")
 const [UserPassword, setUserPassword] = useState("")
 const [UserImage, setUserImage] = useState("")
   //---MODAL
   const modalRef = useRef(null);
const updateModal = (ID,name,email,role,password,image) =>{
    setUserID(ID)
    setUserName(name)
    setUserEmail(email)
    setUserRole(role)
    // setUserPassword(password)
    setUserImage(image)
    const modalInstance = new Modal(modalRef.current);
        modalInstance.show();
}
 

const HandleSubmit =async (e) => {
    e.preventDefault()
    if (UserName == "" || UserEmail == "" || UserRole == "none" || UserPassword == "" || UserImage == "") {
        alert("Fill the form first!")
    }
    else {
        const updateData ={
            userName : UserName,
            userEmail : UserEmail,
            userImage : UserImage,
            userPassword : UserPassword,
            userRole : UserRole
        }
try {
    setUserPassword('')
     const Response = await fetch(`http://localhost:5000/${UserID}`,{
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify(updateData)
        })
        const modalInstance =  Modal.getInstance(modalRef.current);
        modalInstance.hide(); 
        if (Response.ok) { //-------Respone.status ===201
            alert("Role Updated")
          }
          else {
            const checkerror = await Response.json() //-----Response.status===500
            alert(checkerror.error)
          }
} catch (error) {
    setUserPassword('')
    alert(error)
}
       
         
    
    }
}
    return (
        <>
            <div className="container mt-3">
                <h1 className="text-center">
                    User List
                </h1>
                <table class="table mt-4">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserList.map((data, index) => {
                                const i = index + 1 //---to prevent indexing 0
                                return (
                                    <tr>
                                        <th scope="row">{i}</th>
                                        <td>{data.userName}</td>
                                        <td>{data.userEmail}</td>
                                        <td>{data.userRole}</td>
                                        <td>{data.userImage}</td>
                                        <td>
                                            <button onClick={()=>updateModal(data._id,data.userName,data.userEmail,data.userRole,data.userPassword,data.userImage)} className='btn btn-primary btn-sm'>
                                                
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button onClick={()=>DeleteUser(data._id)} className='btn btn-danger btn-sm ms-2'>
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
             {/* Update Modal */}
             <div id='modal_' class="modal fade" ref={modalRef} tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <form className='w-75' onSubmit={HandleSubmit}>
                        <div class="modal-content">
                            <div class="modal-header px-4">
                                <h4 class="modal-title text-center">Update Role</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                            <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input value={UserName} onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input value={UserEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                        <input value={UserImage} onChange={(e) => setUserImage(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                        <select value={UserRole} onChange={(e) => setUserRole(e.target.value)} name="" id="" className="form-select">
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
                        <input  value={UserPassword}onChange={(e) => setUserPassword(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" data-bs-dismiss="modal" aria-label="Close" className="btn btn-primary">Add Roles</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserList
