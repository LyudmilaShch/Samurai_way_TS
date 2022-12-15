import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type MessageDataType = {
    newMessageText: string
}

export const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage
    let dialogsElements =
       state.dialogs.map(d => <DialogItem name={d.name} avatar={d.avatar} id={d.id} key={d.id}/>)

    let messagesElements =
        state.messages.map(m => <Message avatar={m.avatar} name={m.name} message={m.message} key={m.id}/>)


    let addNewMessage = (values: MessageDataType) => {
        props.sendMessage(values.newMessageText) ;
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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<MessageDataType>> = (props)  => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"}
                       name={"newMessageText"}
                       placeholder={"Enter your message"}
                       className={s.sendMessageArea}/>
                    {/*<textarea className={s.sendMessageArea}*/}
                    {/*          value={state.newMessageText}*/}
                    {/*          onChange={messageOnChange}>*/}
                    {/*</textarea>*/}
                <button className={s.sendMessageButton}>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<MessageDataType>({form: "dialogAddMessageForm"})(AddMessageForm);