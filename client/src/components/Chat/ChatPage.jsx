import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Body from './components/body/Body'
import MessageBlock from './components/message-block/MessageBlock'
import style from './ChatStyles.module.css'

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [viewUsers, setViewUsers] = useState(false);
    const [activeChat, setChat] = useState(null);

    useEffect(() => {
        socket.on('responseTyping', (data) => {
            setStatus(data)
            setTimeout(() => { setStatus('') }, 2000)
        });
        socket.on('newMessage', (data) => {
            setMessages([...messages, data])
        })
    }, [socket])

    return (
        <div className={style.chat}>
            <Sidebar socket = { socket } setActiveChat={(chat)=>setActiveChat(chat)}/>
            <main className={style.main}>
                <Body messages={messages} status={status} socket={socket} />
                <MessageBlock socket={socket} />
            </main>
        </div>
    )
}

export default ChatPage