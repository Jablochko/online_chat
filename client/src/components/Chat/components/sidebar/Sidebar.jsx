import React, { useEffect, useState } from 'react'
import style from './SidebarStyle.module.css'

const Sidebar = ({ socket, users }) => {
    return (

        <div className={style.sidebar}>
            <h4 className={style.header}>Список чатов</h4>
            <ul className={style.usersList}>
                {users.map(user=>(
                    <li key={Math.random()}><div className={style.userAccount}>{user}</div></li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar