import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Body from './components/body/Body'
import MessageBlock from './components/message-block/MessageBlock'
import style from './ChatStyles.module.css'

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState('')
    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])
    const [chat, setChat] = useState(null);

    socket.on('allUsers', (data) => setUsers(data))

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
            <Sidebar chats={chats} users={users} />
            <main className={style.main}>
                <Body messages={messages} status={status} socket={socket} users={users} />
                <MessageBlock socket={socket} />
            </main>
        </div>
    )
}

export default ChatPage