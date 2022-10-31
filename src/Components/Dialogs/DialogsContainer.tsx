import React, {ChangeEvent} from 'react';
import {StoreType} from "../../redux/store";
import {SendMessageCreator, UpdateMessageTextCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import StoreContext from '../../StoreContext';

type DialogsContainerType = {
    //store: StoreType
}

export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().dialogsPage

                const sendMessage = () => {
                    store.dispatch(SendMessageCreator(state.newMessageText));
                }

                const messageOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch(UpdateMessageTextCreator(e.currentTarget.value));
                }
                return <Dialogs updateNewMessageBody={messageOnChange} sendMessage={sendMessage} dialogsPage={state}/>
            }}
        </StoreContext.Consumer>
    )
}