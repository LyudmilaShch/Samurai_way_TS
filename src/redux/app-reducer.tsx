import {ActionsTypes} from "./store";
import {getAuthMe} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";


let initialState: InitialStateType = {
    initialized: false
}

export type InitialStateType = {
    initialized: boolean
}

export const AppReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

type initializedSuccessActionType = {
    type: 'INITIALIZED-SUCCESS'
}
export const initializedSuccess = (): initializedSuccessActionType => ({type: 'INITIALIZED-SUCCESS'}) as const

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthMe())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}