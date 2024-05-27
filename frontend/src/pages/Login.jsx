import React from 'react'
import { Link, Navigate, redirect } from 'react-router-dom'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {


  const navigate = useNavigate();
  const url = "http://localhost:3000/users"

  const [users, setUsers] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const checkUserEmail = users.map((u) => u.email)
    const checkUserPassword = users.map((u) => u.password)

    if(checkUserEmail.includes(email) && checkUserPassword.includes(password)){
      navigate('/users')
    } else {
      console.log('Login e senhas erradas!')
    }

  }

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(url)

      const data = await res.json()
  
      setUsers(data)
    }
    fetchData()
  }, [])

  


  return (
    <div>
      <h1>Entre com uma conta:</h1>
      <form onSubmit={handleSubmit}>
        <label>Insira seu e-mail:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Insira o e-mail' />
        <label>Insira sua senha: </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Insira sua senha' />
        <input type="submit" value="Entrar" />
      </form>

      <p>Ainda não possui conta? <Link to="/register">Clique aqui</Link> para se cadastrar.</p>

    </div>
  )
}

export default Login