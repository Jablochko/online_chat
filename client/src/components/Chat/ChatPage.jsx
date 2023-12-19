import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Body from './components/body/Body'
import MessageBlock from './components/message-block/MessageBlock'
import style from './ChatStyles.module.css'

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState('')
    const [users, setUsers] = useState([])
    useEffect(() => {
        socket.on('allUsers', (data) => setUsers(data))
    }, [socket, users])

    useEffect(() => {
        socket.on('responseTyping', (data) => {
            setStatus(data)
            setTimeout(() => { setStatus('') }, 2000)
        })
    }, [socket])

    useEffect(() => {
        socket.on('newMessage', (data) => {
            setMessages([...messages, data])
        })
    }, [socket, messages])

    return (
        <div className={style.chat}>
            <Sidebar socket={socket} users={users}/>
            <main className={style.main}>
                <Body messages={messages} status={status} socket={socket}  users={users}/>
                <MessageBlock socket={socket} />
            </main>
        </div>
    )
}

export default ChatPage