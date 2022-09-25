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
    <NavLink to = {path}>{props.name}</NavLink>
    </div>
}

const Message = (props: MessageType) => {
    return <div className={s.dialog}>{props.message}</div>
}

export const Dialogs = (props: DialogsType) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                 <DialogItem name={"Rabbit"} id={1}/>
                 <DialogItem name={"Leo"} id={2}/>
                 <DialogItem name={"Mouse"} id={3}/>
                 <DialogItem name={"Wolf"} id={4}/>
                 <DialogItem name={"Mouse"} id={5}/>
            </div>
            <div className={s.messages}>
                <Message message={"Hi"}/>
                <Message message={"How is your IT"}/>
                <Message message={"Yo"}/>
                <Message message={"Yo"}/>
                <Message message={"Yo"}/>

            </div>
        </div>
    )
}