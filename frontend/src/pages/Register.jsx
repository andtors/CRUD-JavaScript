import React from 'react'
import './Register.css'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Register = () => {

    const url = "http://localhost:3000/users"
    const [users, setUsers] = useState([])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [data, setData] = useState(null)

    useEffect(  () => {
        async function fetchData() {

          const res = await fetch(url)

          const data = await res.json()
      
          setUsers(data)
        }
        fetchData()
      }, [])

      console.log(users)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataUser = {
            name,
            email,
            password,
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataUser)
            })

            const result = await response.json()
            console.log("Sucesso:", result)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h1>Cadastre um novo usuario no CRUD!</h1>
            <form onSubmit={handleSubmit}>
                <label>Insira seu nome:</label>
                <input type="name" onChange={(e) => setName(e.target.value)} placeholder='Insira o seu nome' value={name} />
                <label>Insira seu e-mail:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Insira o e-mail' value={email} />
                <label>Insira sua senha: </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Insira sua senha' value={password} />
                <input type="submit" value="Cadastrar" />
            </form>

            <p>Já possui conta? <Link to="/">Clique aqui</Link> para fazer login.</p>
            <p>Usuarios cadastrados:</p>
            
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default Register