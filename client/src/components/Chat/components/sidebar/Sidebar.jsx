import React, { useRef, useEffect, useState } from 'react'
import style from './SidebarStyle.module.css'
import Cell from './Cell/Cell'
import User from './User/User'

const Sidebar = ({ socket, setActiveChat, activeChat }) => {

    const [newChatUsers, setChatUsers] = useState({});
    const [showUsers, setShowUsers] = useState(false)
    const [users, setUsers] = useState({});
    const [chats, setChats] = useState({})
    const [createChat, setCreateChat] = useState(false);

    useEffect(() => {
        socket.on('allUsers', (users) => {
            const userList = {}
            users.forEach(user => {
                userList[user.id] = {
                    name: user.name,
                    id: user.id
                }
            })
            setUsers(userList)
        });

        socket.on('chatList', (chats) => {
            const chatList = {}
            chats.forEach(chat => {
                chatList[chat.chatId] = {
                    name: `Чат: ${chat.chatId}`,
                    id: chat.chatId,
                    members: chat.members
                }
            })
            setChats(chatList)
        })
    }, [socket]);

    const listFormat = () => {
        if (showUsers) return Object.values(users).map(user =>
            <User key={user.id} data={user} onClick={clickUserHandler} />
        );
        return Object.values(chats).map(chat =>
            <Cell key={chat.id} data={chat} onClick={clickChatHandler} selected={(chat.id === activeChat?.id)}/>
        );
    }

    const clickUserHandler = (userId) => {
        if (!newChatUsers[userId]) {
            newChatUsers[userId] = true
            if (!createChat) setCreateChat(true);
        }
        else {
            delete (newChatUsers[userId]);
            console.log(Object.keys(newChatUsers).length);
            if (Object.keys(newChatUsers).length === 0) {
                setCreateChat(false)
            };
        }
    }

    const clickChatHandler = (chatId) => {
        setActiveChat(chats[chatId]);
    }

    function setChatsUsersList() {
        setShowUsers(!showUsers);
        setChatUsers({});
        setCreateChat(false);
    }

    const showUsersHandler = () => setChatsUsersList();

    const createChatClickHandler = () => {
        socket.emit("newChat", {
            members: Object.keys(newChatUsers),
            name: "Новый чат"
        })
        setChatsUsersList();
    }

    return (
        <div className={style.sidebar}>

            <div className={style.headerDiv}><h4 className={style.header}>{!showUsers ? "Список чатов" : "Список пользователей"}</h4></div>

            <div className={style.userListDiv}>
                {listFormat()}
            </div>

            <div className={style.buttonsDiv}>
                {createChat ? <button className={style.createChat} onClick={createChatClickHandler}>Создать чат</button> : <></>}
                <button
                    className={style.searchUser}
                    onClick={showUsersHandler}
                >{showUsers ? "Отмена" : "Добавить"}</button>
            </div>
        </div>
    )
}

export default Sidebar