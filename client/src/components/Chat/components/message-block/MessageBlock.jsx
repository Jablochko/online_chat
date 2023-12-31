import React, { useState } from 'react'
import style from './MessageBlockStyle.module.css'

const MessageBlock = ({ socket }) => {
    const [message, setMessage] = useState('')

    const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} печатает...`)

    const handleSend = (e) => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem('user')) {
            socket.emit('message', message)
        }
        setMessage('')
    }

    return (
        <div className={style.messageBlock}>
            <form className={style.form} onSubmit={handleSend}>
                <input
                    placeholder='Введите сообщение...'
                    type="text"
                    className={style.userMessage}
                    value={message}
                    onKeyDown={isTyping}
                    onChange={(e) => { setMessage(e.target.value) }} />
                <button className={style.btnSend}>Отправить</button>
            </form>
        </div>
    )
}

export default MessageBlock