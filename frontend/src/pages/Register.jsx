import React from 'react'
import './Register.css'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Register = () => {

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
    clearFields()
}
    
    const deleteUser = async () => {
        var urlUser = `${url}/${userId}`
        await fetch(urlUser, {
            method: 'DELETE',
            headers: {
                "Content-type":"application/json"
            }
        })
        
    }

    const getEditUser = async () => {
        var urlUser = `${url}/${userId}`
        
        try {
           const response = await fetch(urlUser)

           const data = await response.json()
         
            setNameEdit(data.name)
            setPasswordEdit(data.password)
            return data
        } catch (error) {
            console.log(error)
        }
    }


    const handleEdit = async (e) => {
        e.preventDefault()

        const editedUser = {
            name: nameEdit,
            password: passwordEdit
        }

        var urlUser = `${url}/${userId}`
        await fetch(urlUser, {
            method: 'PUT',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(editedUser)
        })
        clearFields()
    }
   

    const clearFields = () => {
        setName("")
        setEmail("")
        setPassword("")
        setNameEdit("")
        setPasswordEdit("")
        setUserId("")
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
            <h1>Edite as informações</h1>
            <form onSubmit={handleEdit}>
                <label>Atualize seu nome:</label>
                <input type="name" onChange={(e) => setNameEdit(e.target.value)} value={nameEdit} />
                <label>Atualize sua senha:</label>
                <input type="name" onChange={(e) => setPasswordEdit(e.target.value)} value={passwordEdit} />
                <input type="submit" value="Editar" />
            </form>

            <p>Já possui conta? <Link to="/">Clique aqui</Link> para fazer login.</p>
            <p>Usuarios cadastrados:</p>
            
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} - {user.email} <span onClick={() => getEditUser(setUserId(user.id))}>Editar</span> <span onClick={() => deleteUser(setUserId(user.id))}>Deletar</span></li>
                ))}
            </ul>
        </div>
    )
}

export default Register