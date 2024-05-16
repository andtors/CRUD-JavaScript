import './App.css'

import {BrowserRouter, Routes, Route,} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/users" element={<Users />}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
