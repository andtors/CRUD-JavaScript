import React from 'react'
import './Register.css'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

    const navigate = useNavigate();

    const url = "http://localhost:3000/users"
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [nameEdit, setNameEdit] = useState("")
    const [passwordEdit, setPasswordEdit] = useState("")

    useEffect(() => {
        async function fetchData() {

          const res = await fetch(url)

          const data = await res.json()
      
          setUsers(data)
        }
        fetchData()
      }, [setTimeout(1000)])
      
      
    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataUser = {
            name,
            email,
            password,
        }
        validateRegister(dataUser)
    }
    
    const validateRegister = async(dataUser) => {
        try {
            const res = await fetch(url)

            const data = await res.json()

            const checkEmail = data.map((d) => d.email)
            if(checkEmail.includes(dataUser.email)){
                console.log('Usuario já cadastrado!')
                return
            } else if (dataUser.name.length === 0 || dataUser.email.length === 0|| dataUser.password.length === 0) {
                console.log('Informe um nome, email ou senha valído')
                return
            } else {
                finalRegister(dataUser)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const finalRegister = async(dataUser) => {
        await fetch(url, {
            method:'POST',
            headers: {
                "Content-Type" : "application.json"
            },
            body: JSON.stringify(dataUser)
        }
    )
    navigate('/users')
    
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
           
        </div>
    )
}

export default Register