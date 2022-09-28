import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

type DailogsType = {
    dialogs: DialogType[]
    messages: MessagesType[]
}
type DialogType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}

export const Dialogs = (props: DailogsType) => {

    let dialogsElements =
        props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements =
        props.messages.map(m => <Message message={m.message}/>)


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