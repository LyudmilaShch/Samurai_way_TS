import React, {ChangeEvent} from 'react';
import {StoreType} from "../../redux/store";
import {SendMessageCreator, UpdateMessageTextCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";

type DialogsContainerType = {
    store: StoreType
}

export const DialogsContainer = (props: DialogsContainerType) => {
    let state = props.store.getState().dialogsPage

    const sendMessage = () => {
        props.store.dispatch(SendMessageCreator(state.newMessageText));
    }

    const messageOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch(UpdateMessageTextCreator(e.currentTarget.value));
    }

    return (
        <Dialogs updateNewMessageBody={messageOnChange} sendMessage={sendMessage} dialogsPage={state} />
    )
}