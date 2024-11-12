import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Import components
import Navbar from './Components/Navbar'

// import Pages
import AddUser from './Pages/AddUser'
import UserList from './Pages/UserList' 
// --- Error Page : when the url does'nt match with routes
import ErrorPage from './Pages/ErrorPage'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path='/' element={<UserList/>} />
    <Route path='/addUser' element={<AddUser/>} />
    <Route path="*" element={<ErrorPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
