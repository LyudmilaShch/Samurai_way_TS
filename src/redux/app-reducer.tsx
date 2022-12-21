import {ActionsTypes} from "./store";
import {Dispatch} from "redux";
import {getAuthMe} from "./auth-reducer";


let initialState = {
    initialized: false
}

export type InitialStateType = {
    initialized: boolean
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'}) as const


export const initializeApp = () => (dispatch: Dispatch) => {
    // @ts-ignore
    let promise = dispatch(getAuthMe())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}
