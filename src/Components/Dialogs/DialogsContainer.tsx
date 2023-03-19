import React from 'react';
import {InitialStateType, actions} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

type MapStatePropsType = {
    dialogsPage: InitialStateType
}

type MapDispatchPropsType = {
    sendMessage: (newMessageText: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.SendMessage}),
    withAuthRedirect
)(Dialogs)
