import React, {ChangeEvent} from 'react';
import {InitialStateType, SendMessageCreator, UpdateMessageTextCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

type DialogsContainerType = {
    //store: StoreType
}

// export const DialogsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState().dialogsPage
//
//                 const sendMessage = () => {
//                     store.dispatch(SendMessageCreator(state.newMessageText));
//                 }
//
//                 const messageOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//                     store.dispatch(UpdateMessageTextCreator(e.currentTarget.value));
//                 }
//                 return <Dialogs updateNewMessageBody={messageOnChange} sendMessage={sendMessage} dialogsPage={state}/>
//             }}
//         </StoreContext.Consumer>
//     )
// }



type MapStatePropsType = {
    dialogsPage: InitialStateType
    newMessageText: string
}

type MapDispatchPropsType = {
    sendMessage: (newMessageText: string) => void
    updateNewMessageBody: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {

    return {
        sendMessage:(newMessageText: string) => {
            dispatch(SendMessageCreator(newMessageText));
        },
        updateNewMessageBody: (e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(UpdateMessageTextCreator(e.currentTarget.value));
        }
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);