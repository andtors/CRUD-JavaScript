import React from 'react'
import { Link } from 'react-router-dom'

import { useState } from 'react'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        console.log(user)
    }

    

  return (
    <div>
        <h1>Faça o Login para acessar o crud!</h1>
        <form onSubmit={handleSubmit}>
            <label>Insira seu e-mail:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Insira o e-mail'/>
            <label>Insira sua senha: </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Insira sua senha'/>
            <input type="submit" value="Entrar"/>
        </form>

        <p>Ainda não possui conta? <Link to="/register">Clique aqui</Link> para se cadastrar.</p>

    </div>
  )
}

export default Login