import React, { useEffect, useState } from 'react'
import style from './SidebarStyle.module.css'

const Sidebar = ({ socket }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        socket.on('responseNewUser', (data) => setUsers(data))
    }, [socket, users])
    return (

        <div className={style.sidebar}>
            <h4 className={style.header}>Users</h4>
            <ul className={style.usersList}>
                {users.map(user=>(
                    <li key={user.socketId}>{user.user}</li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar