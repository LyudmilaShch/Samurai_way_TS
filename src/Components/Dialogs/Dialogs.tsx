import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPageType} from "../../redux/State";

type DailogsType = {
    state: DialogPageType
}

export const Dialogs = (props: DailogsType) => {

    let dialogsElements =
        props.state.dialogs.map(d => <DialogItem name={d.name} avatar={d.avatar} id={d.id}/>)

    let messagesElements =
        props.state.messages.map(m => <Message avatar={m.avatar} name={m.name} message={m.message}/>)

    let newMessageElement = React.createRef<HTMLTextAreaElement>();

    const sendMessage = () => {
        let text = newMessageElement.current?.value;
        alert(text)
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
                    <textarea ref={newMessageElement} className={s.sendMessageArea}></textarea>
                    <button onClick={sendMessage} className={s.sendMessageButton}>Send</button>
                </div>
            </div>
        </div>
    )
}