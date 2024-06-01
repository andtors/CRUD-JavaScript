import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const EditUser = () => {

    const url = "http://localhost:3000/users"
    const {id} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        async function fetchData() {
            try {
                const res =  await fetch(`${url}/${id}`)

                res.json()
                .then((user) =>{
                    setName(user.name)
                    setEmail(user.email)
                    setPassword(user.password)
                })


            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    function handleEdit(e) {
        e.preventDefault()

        const user = {
            name,
            email,
            password
        }

        try {
            fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            navigate('/users')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <h1>Edite as informações</h1>
            <form onSubmit={handleEdit}>
                <label>Atualize seu nome:</label>
                <input type="name" onChange={(e) => setName(e.target.value)} value={name || ""} required />
                <label>Atualize seu e-mail:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email || ""} required />
                <label>Atualize sua senha:</label>
                <input type="name" onChange={(e) => setPassword(e.target.value)} value={password || ""} required />
                <input type="submit" value="Editar" />
            </form>
            <p><Link to="/users">Clique aqui!</Link> para voltar a tela de usuários</p>
        </div>
        
    )
}

export default EditUser