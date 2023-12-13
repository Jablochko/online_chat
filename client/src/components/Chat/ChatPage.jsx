import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Body from './components/body/Body'
import MessageBlock from './components/message-block/MessageBlock'
import style from './ChatStyles.module.css'

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        socket.on('responseTyping', (data) => {
            setStatus(data)
            setTimeout(() => { setStatus('') }, 2000)
        })
    }, [socket])

    useEffect(() => {
        socket.on('response', (data) => {
            setMessages([...messages, data])
        })
    }, [socket, messages])

    return (
        <div className={style.chat}>
            <Sidebar socket={socket} />
            <main className={style.main}>
                <Body messages={messages} status={status} />
                <MessageBlock socket={socket} />
            </main>
        </div>
    )
}

export default ChatPage