import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";




export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage
    let dialogsElements =
       state.dialogs.map(d => <DialogItem name={d.name} avatar={d.avatar} id={d.id} key={d.id}/>)

    let messagesElements =
        state.messages.map(m => <Message avatar={m.avatar} name={m.name} message={m.message} key={m.id}/>)

    const sendMessage = () => {
        props.sendMessage(props.newMessageText) ;
    }

    const messageOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e);

    }
    if (!props.isAuth) return <Redirect to={"/Login"}/>

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
                    <textarea className={s.sendMessageArea}
                              value={state.newMessageText}
                              onChange={messageOnChange}>
                    </textarea>
                    <button onClick={sendMessage} className={s.sendMessageButton}>Send</button>
                </div>
            </div>
        </div>
    )
}