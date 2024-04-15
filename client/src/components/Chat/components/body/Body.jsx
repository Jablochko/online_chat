import React from 'react'
import style from './BodyStyles.module.css'
import { useNavigate } from 'react-router-dom'

const Body = ({ messages, status, socket, user, setUserData }) => {

    const navigate = useNavigate()

    const handleLeave = () => {
        socket.emit("disconnection");
        setUserData(null);
        navigate('/')
    }

    return (
        <>
            <header className={style.headerBody}>
                <div className={style.userLogin}>Ваш ник: <span>{user}</span></div>
                <button onClick={handleLeave} className={style.btnOut}>Покинуть чат</button>
            </header>

            <div className={style.container}>
                {
                    messages.map(mess =>
                        mess.from === user ? (
                            <div className={style.chats} key={Math.random()}>
                                <p className={style.senderName}>{mess.from}</p>
                                <div className={style.messageSender}>
                                    <p>{mess.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className={style.chats} key={Math.random()}>
                                <p>{mess.from}</p>
                                <div className={style.messageRecipient}>
                                    <p>{mess.text}</p>
                                </div>
                            </div>
                        )
                    )
                }

                <div className={style.status}>
                    <p>{status}</p>
                </div>

            </div>
        </>
    )
}

export default Body