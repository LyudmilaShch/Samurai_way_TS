import React from 'react';
import s from './Dialogs.module.scss';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, Input, Textarea} from "../common/FormControls/FormsControls";
import {FormDataType} from "../Login/Login";


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
        props.sendMessage(values.newMessageText);
    }

    return (

        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                Dialogs
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.nameMessages}> Rabbit</div>
                <div className={s.messagesContainer}>
                    {messagesElements}
                </div>

                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

const maxLength50 = maxLengthCreator(50)
type NewMessageFormValuesKeysTypes = Extract<keyof MessageDataType, string>
const AddMessageForm: React.FC<InjectedFormProps<MessageDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.sendMessageContainer}>
                {createField<NewMessageFormValuesKeysTypes>("Enter your message", "newMessageText",
                    [required, maxLength50], Textarea, {className: s.sendMessageArea}, "", null)}
                <div className={s.buttonContainer}>
                    <button className={s.sendMessageButton}>Send</button>
                </div>

            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<MessageDataType>({form: "dialogAddMessageForm"})(AddMessageForm);