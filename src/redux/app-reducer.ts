import {getAuthMe} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

type ActionsTypes = InferActionsTypes<typeof actions>

export type InitialStateType = typeof initialState
export const AppReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED-SUCCESS':
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}


const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED-SUCCESS'}) as const
}

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthMe())

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

