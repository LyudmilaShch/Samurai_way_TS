import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type DialogsType = {}

type DialogItemType = {
    name: string,
    id: number
}
type MessageType = {
    message: string
}

const DialogItem = (props: DialogItemType) => {
    let path = "/dialogs/" + props.id;

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

const Message = (props: MessageType) => {
    return <div className={s.dialog}>{props.message}</div>
}

export const Dialogs = (props: DialogsType) => {

    let dialogs = [
        {id: 1, name: 'Rabbit'},
        {id: 2, name: 'Leo'},
        {id: 3, name: 'Mouse'},
        {id: 4, name: 'Wolf'},
        {id: 5, name: 'Mouse'},
    ]

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your IT'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 5, message: 'Bye'},
    ]

    let dialogsElements = dialogs
        .map(d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = messages
        .map(m => <Message message={m.message}/>)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}