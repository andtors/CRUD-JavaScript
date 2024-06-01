import React from 'react'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {

  const url = "http://localhost:3000/users"
  const [users, setUsers] = useState([])

  const deleteUser = async (userId) => {

    try {
      var urlUser = `${url}/${userId}`
      await fetch(urlUser, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json"
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(url)

      const data = await res.json()

      setUsers(data)
    }
    fetchData()
  }, [deleteUser])



  return (
    <div>
      <p></p>
      <p>Usuarios cadastrados:</p>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email} <Link to={`/users/${user.id}`}>Editar</Link> <button onClick={() => deleteUser(user.id)}>Deletar</button></li>
        ))}
      </ul>

      <p>Registrar mais usuarios <Link to="/register">Aqui!</Link></p>

    </div>
  )
}

export default Users