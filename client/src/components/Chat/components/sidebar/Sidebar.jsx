import React, { useRef, useEffect, useState } from 'react'
import style from './SidebarStyle.module.css'
import Cell from './Cell/Cell'

const Sidebar = ({ chats, users, setChat }) => {

    const [showUsers, setShowUsers] = useState(false)
    const [showChatsStr, setShowChatsStr] = useState(true)
    const [acceptUser, setAcceptUser] = useState(false)

    const listFormat = (list) => {
        /* return list.map(elem => (
             <li key={Math.random()}><div className={style.userAccount + " " + ((acceptUser) ? style.accept : "")} onClick={(showUsers) ? (event) => clickUserHandler(elem,event) : () => clickChatHandler(elem)}>{elem}</div></li>
         ))*/
        return list.map(elem => <Cell data={elem} handler={clickUserHandler}/>)
    }

    let newChatUsers = [];

    const clickUserHandler = (user, event) => {
        newChatUsers.push(user);
        setAcceptUser(!acceptUser)
    }

    const clickChatHandler = (chat) => {
        setChat(chat.id)
    }

    const showUsersHandler = () => {
        console.log(chats, users);
        newChatUsers = [];
        setShowUsers(!showUsers);
        setShowChatsStr(!showChatsStr)
    }

    return (

        <div className={style.sidebar}>
            <h4 className={style.header}>{showChatsStr ? "Список чатов" : "Список пользователей"}</h4>
            <ul className={style.usersList}>
                {listFormat( showUsers  ? users : chats)}
            </ul>
            <button
                className={style.seachUser}
                onClick={showUsersHandler}
            >{showUsers ? "Отмена" : "Добавить"}</button>
        </div>
    )
}

export default Sidebar