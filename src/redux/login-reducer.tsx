import {ActionsTypes} from "./store";
import {authAPI, authorizationModelType} from "../api/api";


let initialState = {
    email: " ",
    password: " ",
    rememberMe: false
}

export type InitialStateType = {
    email: string
    password: string
    rememberMe: boolean
}


export const LoginReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SET-LOGIN':
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: action.rememberMe
            }

        default:
            return state;
    }
}


export const setLogin = (email: string, password: string, rememberMe: boolean) =>
    ({
        type: 'SET-LOGIN',
        email,
        password,
        rememberMe
    }) as const

export const authorization = (authorizationModel: authorizationModelType) => {
    debugger
    return (dispatch: any) => {
        authAPI.loginPost(authorizationModel)
            .then(response => {
                dispatch(setLogin(authorizationModel.email, authorizationModel.password, authorizationModel.rememberMe))
            });
    }
}

