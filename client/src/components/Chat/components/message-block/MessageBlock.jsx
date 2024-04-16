import React, { useState } from 'react'
import style from './MessageBlockStyle.module.css'

const MessageBlock = ({ socket, user, activeChat}) => {
    const [message, setMessage] = useState('')

    const isTyping = () => socket.emit('typing', `${user} печатает...`)

    const handleSend = (e) => {
        e.preventDefault()
        if (message.trim()) {
            socket.emit('message',{
                chatId: activeChat,
                text: message,
            } )
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