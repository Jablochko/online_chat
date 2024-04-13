import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Body from './components/body/Body'
import MessageBlock from './components/message-block/MessageBlock'
import style from './ChatStyles.module.css'

const ChatPage = ({ socket, user, setUserData }) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [viewUsers, setViewUsers] = useState(false);
    const [activeChat, setChat] = useState(null);

    const navigate = useNavigate()

    

    useEffect(() => {
        if (!user) navigate("/");
    }, [user])

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
                <Body messages={messages} status={status} socket={socket} user={user} setUserData={setUserData}/>
                <MessageBlock socket={socket} user={user}/>
            </main>
        </div>
    )
}

export default ChatPage