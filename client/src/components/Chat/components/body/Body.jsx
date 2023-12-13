import React from 'react'
import style from './BodyStyles.module.css'
import { useNavigate } from 'react-router-dom'

const Body = ({ messages, status }) => {

    const navigate = useNavigate()

    const handleLeave = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <>
            <header className={style.headerBody}>
                <button onClick={handleLeave} className={style.btnOut}>Покинуть чат</button>
            </header>

            <div className={style.container}>
                {
                    messages.map(mess =>
                        mess.name === localStorage.getItem('user') ? (
                            <div className={style.chats} key={mess.id}>
                                <p className={style.senderName}>{mess.name}</p>
                                <div className={style.messageSender}>
                                    <p>{mess.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className={style.chats}>
                                <p>{mess.name}</p>
                                <div className={style.messageRecipient}>
                                    <p>{mess.text}</p>
                                </div>
                            </div>
                        )
                    )
                }

                <div className={style.status}>
                    <p>--{status}</p>
                </div>

            </div>
        </>
    )
}

export default Body