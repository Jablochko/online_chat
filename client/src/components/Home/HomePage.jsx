import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './HomeStyles.module.css'

const HomePage = ({ socket }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState("")

    const heandleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("user", user)
        socket.emit('newUser', {
            user,
            socketId: socket.id
        })
        navigate("/chat")
    }

    return (
        <form onSubmit={heandleSubmit} className={style.container}>
            <h2>Вход в чат</h2>
            <label htmlFor="user"></label>
            <input
                type="text"
                id="user"
                value={user}
                placeholder='Введите ваш логин...'
                onChange={e => {
                    setUser(e.target.value)
                }}
                className={style.userInput} />
                 <input
                type="text"
                placeholder='Введите ваш пароль...'
                className={style.userInput} />
            <button type='submit' className={style.homeBtn}>Bойти</button>
        </form>
    )
}

export default HomePage