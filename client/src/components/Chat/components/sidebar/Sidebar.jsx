import React, { useRef, useEffect, useState } from 'react'
import style from './SidebarStyle.module.css'
import Cell from './Cell/Cell'

const Sidebar = ({ socket, setActiveChat }) => {

    let newChatUsers = {};
    const [showUsers, setShowUsers] = useState(false)
    const [acceptUser, setAcceptUser] = useState(false)
    const [users, setUsers] = useState({});
    const [createChat, setCreateChat] = useState(false);

    useEffect(() => {
        socket.on('allUsers', (users) => {
            /*{
                name: string,
                id: number,
            }*/
            const userList = {}
            users.forEach(user => {
                userList[user.id] = {
                    name: user.name,
                    id: user.id
                }
            })
            setUsers(userList)
        });

    }, [socket]);

    const listFormat = () => {
        const list = [];
        if (showUsers) return Object.values(users).map(user =>
            <Cell key={user.id} data={user} onclick={clickUserHandler} />
        );
        return ("chats");
        /*return list.map(elem => (
            <li key={Math.random()}><div className={style.userAccount + " " + ((acceptUser) ? style.accept : "")} onClick={(showUsers) ? (event) => clickUserHandler(elem,event) : () => clickChatHandler(elem)}>{elem}</div></li>
        ))*/
        // return list.map(elem => <Cell data={elem} handler={clickUserHandler}/>)
    }

    /*let newChatUsers = [];*/

    const clickUserHandler = (userId) => {
        if (!newChatUsers[userId]) {
            newChatUsers[userId] = true
            if (!createChat) setCreateChat(true);
        }
        else {
            delete (newChatUsers[userId]);
            if (Object.keys(newChatUsers)[0]) setCreateChat(false);
        }
        console.log(createChat);
    }

    const clickChatHandler = (chat) => {
        setChat(chat.id)
    }

    function setChatsUsersList() {
        setShowUsers(!showUsers);
        newChatUsers = {};
        setCreateChat(false);
    }

    const showUsersHandler = () => setChatsUsersList();

    const createChatClickHandler = () => {
        console.log(Object.keys(newChatUsers));
        setChatsUsersList();
    }

    return (
        <div className={style.sidebar}>

            <div className={style.headerDiv}><h4 className={style.header}>{!showUsers ? "Список чатов" : "Список пользователей"}</h4></div>

            <div className={style.userListDiv}>
                <ul className={style.usersList}>
                    {listFormat()}
                </ul>
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