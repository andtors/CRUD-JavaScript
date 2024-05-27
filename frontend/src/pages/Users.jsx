import React from 'react'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {

  const url = "http://localhost:3000/users"
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState("")

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const deleteUser = async (userId) => {

    var urlUser = `${url}/${userId}`
    await fetch(urlUser, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      }
    })

  }


  const getEditUser = async (value) => {

    var urlUser = `${url}/${userId}`

    try {
      const response = await fetch(urlUser)

      const data = await response.json()

      setName(data.name)
      setPassword(data.password)
      setEmail(data.email)
      return data
    } catch (error) {
      console.log(error)
    }
    
  }


  const handleEdit = async (e) => {

    var urlUser = `${url}/${userId}`

    e.preventDefault()
    
    const editedUser = {
      name,
      email,
      password
    }

    await fetch(urlUser, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(editedUser)
    })

    clearFields()
  }

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(url)

      const data = await res.json()

      setUsers(data)
    }
    fetchData()
  }, [handleEdit, deleteUser])


  const clearFields = () => {
    setName("")
    setPassword("")
    setEmail("")
    
}

  return (
    <div>
      <p>Usuarios cadastrados:</p>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email} <span onClick={() => getEditUser(setUserId(user.id))}>Editar</span> <span onClick={() => deleteUser(user.id)}>Deletar</span></li>
        ))}
      </ul>

      <p>Registrar mais usuarios <Link to="/register">Aqui!</Link></p>

      { userId != undefined  &&
      <>
       <h1>Edite as informações</h1>
            <form onSubmit={handleEdit}>
                <label>Atualize seu nome:</label>
                <input type="name" onChange={(e) => setName(e.target.value)} value={name} />
                <label>Atualize seu e-mail:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label>Atualize sua senha:</label>
                <input type="name" onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type="submit" value="Editar" />
            </form>
            </>
    }
      </div>
  )
}

export default Users