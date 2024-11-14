import React, { useEffect, useRef, useState } from 'react'
import { Modal } from "bootstrap";
const UserList = () => {
    // -----UserLIST
    const [UserList, setUserList] = useState([])
    const [Roles, setRoles] = useState([])
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
    const DeleteUser = async (ID, user_Name, imageID) => {
        const isConfirmed = window.confirm(
            `Are you sure you want to delete the user ${user_Name}?`
        );
        if (isConfirmed) {
            try {
                // const formData = new FormData();
                // formData.append('imageID', imageID);
                const Data= {
                    OLDimageID:imageID
                  
                  }
                const Response = await fetch(`http://localhost:5000/${ID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(Data)
                })
                if (Response.status === 201) {
                    alert(`User ${user_Name} deleted`)
                    // toast.success(`Role Deleted`);
                } else {
                    const checkerror = await Response.json() //-----Response.status===500
                    alert(`Error ${Response.status} : ${checkerror.error} `)

                    // toast.error(`Error :${Response.status} ${checkerror.error}`);
                }
            } catch (error) {
                console.log({ "Error": error })
            }
        }


    }
    //--------input fields
    const [UserID, setUserID] = useState("")
    const [UserName, setUserName] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserRole, setUserRole] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [UserImage, setUserImage] = useState("")
    const [OldImage, setOldImage] = useState("")
    const [Imagefilename, setImagefilename] = useState("")
    //---MODAL
    const modalRef = useRef(null);
    const [IMG, setIMG] = useState("")
    const updateModal = (ID, name, email, role, password, image,oldfilename) => {
        setUserID(ID)
        setUserName(name)
        setUserEmail(email)
        setUserRole(role)
        setIMG(image)
        setOldImage(image)
        setImagefilename(oldfilename)
        // setUserPassword(password)
        const modalInstance = new Modal(modalRef.current);
        modalInstance.show();
    }

    const handleImageChange = (e) => {
        setIMG(URL.createObjectURL(e.target.files[0]));
        setUserImage(e.target.files[0]);
    };
    const HandleSubmit = async (e) => {
        e.preventDefault()
        if (UserName == "" || UserEmail == "" || UserRole == "none" || UserPassword == "") {
            alert("Fill the form first!")
        }
        else {

            if (IMG == OldImage) {
                const updateData = {
                    userName: UserName,
                    userEmail: UserEmail,
                    userPassword: UserPassword,
                    userRole: UserRole,
                    useroldImage: OldImage,
                    Imagefilename: Imagefilename
                }
                try {
                    setUserPassword('')
                    const Response = await fetch(`http://localhost:5000/${UserID}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updateData)
                    })
                    const modalInstance = Modal.getInstance(modalRef.current);
                    modalInstance.hide();
                    if (Response.ok) { //-------Respone.status ===201
                        alert(`User ${UserName} Updated`)
                    }
                    else {
                        const checkerror = await Response.json() //-----Response.status===500
                        console.log(checkerror.error)
                    }
                } catch (error) {
                    setUserPassword('')
                    console.log(error)
                }
            }
            else {
                const updateData = new FormData();
                updateData.append('userName', UserName);
                updateData.append('userEmail', UserEmail);
                updateData.append('userPassword', UserPassword);
                updateData.append('userRole', UserRole);
                updateData.append('userImage', UserImage);
                updateData.append('Imagefilename', Imagefilename);
                try {
                    setUserPassword('')
                    const Response = await fetch(`http://localhost:5000/${UserID}`, {
                        method: "PUT",
                        body: updateData
                    })
                    const modalInstance = Modal.getInstance(modalRef.current);
                    modalInstance.hide();
                    if (Response.ok) { //-------Respone.status ===201
                        alert(`User ${UserName} Updated`)
                    }
                    else {
                        const checkerror = await Response.json() //-----Response.status===500
                        console.log(checkerror.error)
                    }
                } catch (error) {
                    setUserPassword('')
                    console.log(error)
                }

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
                                        <td>
                                            <img src={data.userImage} style={{ maxWidth: "100px" }} alt="" className=' img-thumbnail ' />
                                        </td>
                                        <td>
                                            <button onClick={() => updateModal(data._id, data.userName, data.userEmail, data.userRole, data.userPassword, data.userImage,data.userImageID)} className='btn btn-primary btn-sm'>

                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button onClick={() => DeleteUser(data._id, data.userName, data.userImageID)} className='btn btn-danger btn-sm ms-2'>
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {
                    UserList.length <= 0
                        ?
                        <h1 className='text-center mt-5'> No Data Found</h1>
                        : null
                }
            </div>
            {/* Update Modal */}
            <div id='modal_' class="modal fade" ref={modalRef} tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <form method='post' enctype="multipart/form-data" className='w-100' onSubmit={HandleSubmit}>
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
                                <div className="row mb-3 mt-2">
                                    <div className=" col-9">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                                        <input name='userImage' onChange={(e) => handleImageChange(e)} type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="col-3 ">
                                        {
                                            IMG == "" ?
                                                <div style={{
                                                    backgroundColor: "#98939378", width: "100px", height: "100px", color: "grey",
                                                    fontSize: "13px"
                                                }} className='px-3 py-4 text-center'>
                                                    No Image selected
                                                </div>

                                                :
                                                <img style={{ maxWidth: "100px" }} alt="" className=' img-thumbnail ' src={IMG} />
                                        }
                                    </div></div>
                                <div className="mb-3 mt-2">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                                    <select value={UserRole} onChange={(e) => setUserRole(e.target.value)} name="" id="" className="form-select">
                                        <option selected value="none">Select Role</option>
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
                                    <input value={UserPassword} onChange={(e) => setUserPassword(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" data-bs-dismiss="modal" aria-label="Close" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserList
