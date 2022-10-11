import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../redux/State";

type DailogsType = {
    state: DialogPageType
    sendMessage: (MessageText: string) => void
    updateMessageText: (newMessageText: string) => void
}

export const Dialogs = (props: DailogsType) => {

    let dialogsElements =
        props.state.dialogs.map(d => <DialogItem name={d.name} avatar={d.avatar} id={d.id}/>)

    let messagesElements =
        props.state.messages.map(m => <Message avatar={m.avatar} name={m.name} message={m.message}/>)

    const sendMessage = () => {
            props.sendMessage(props.state.newMessageText);
    }

    const messageOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateMessageText(e.currentTarget.value);
    }

    return (

        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                Dialogs
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.nameMessages}> Rabbit</div>
                {messagesElements}
                <div>
                    <textarea className={s.sendMessageArea} value={props.state.newMessageText} onChange={messageOnChange}></textarea>
                    <button onClick={sendMessage} className={s.sendMessageButton}>Send</button>
                </div>
            </div>
        </div>
    )
}