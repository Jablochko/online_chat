import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Body from './components/body/Body'
import MessageBlock from './components/message-block/MessageBlock'
import style from './ChatStyles.module.css'

const ChatPage = ({ socket, user, setUserData }) => {
    const [cacheMessages, setCacheMessages] = useState({});
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState('');
    const [activeChat, setActiveChat] = useState(null);

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
            if (!cacheMessages[data.chatId]) cacheMessages[data.chatId] = [];
            cacheMessages[data.chatId] = [...cacheMessages[data.chatId], {
                from: data.from,
                text: data.text
            }]
            setMessages(cacheMessages[data.chatId]);
        })
    }, [socket])

    useEffect(() => {
        if (activeChat) {
        setMessages(cacheMessages[activeChat.id] ? [...cacheMessages[activeChat.id]] : []);
        }
    },[activeChat])

    return (
        <div className={style.chat}>
            <Sidebar socket = { socket } setActiveChat={(chat)=>setActiveChat(chat)} activeChat={activeChat}/>
            <main className={style.main}>
                <Body messages={messages} status={status} socket={socket} user={user} setUserData={setUserData}/>
                <MessageBlock activeChat={activeChat?.id} socket={socket} user={user}/>
            </main>
        </div>
    )
}

export default ChatPage