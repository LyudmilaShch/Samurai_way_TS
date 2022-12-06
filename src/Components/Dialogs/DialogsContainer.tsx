import React, {ChangeEvent} from 'react';
import {InitialStateType, SendMessageCreator, UpdateMessageTextCreator} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

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

let AuthRedirectComponent = withAuthRedirect(Dialogs);



export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);