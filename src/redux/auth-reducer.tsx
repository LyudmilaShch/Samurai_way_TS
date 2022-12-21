import {ActionsTypes} from "./store";
import {authAPI, authorizationModelType} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";


export type AuthType = {
    "login": string | null,
    isAuth: boolean,
    photo: string | null
    loginOut: () => void
}

let initialState = {
    data: {
        userid: null,
        email: null,
        login: null,
        isAuth: false,
    },
    photo: null
}

export type InitialStateType = {
    data: {
        userid: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    },
    photo: string | null
}

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            console.log(action.data.isAuth)
            return {
                ...state, data: {...action.data}
            }
        case 'SET-AUTH-USER-PHOTO':
            return {...state, photo: action.photo}

        default:
            return state;
    }
}

export const setAuthUserData = (userid: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
        type: 'SET-USER-DATA',
        data: {userid, email, login, isAuth}
    }) as const

export const setAuthUserPhoto = (photo: string | null) =>
    ({
        type: 'SET-AUTH-USER-PHOTO',
        photo: photo
    }) as const


export const getAuthMe = () => (dispatch: Dispatch) => {
       return authAPI.getAuthMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserData(id, email, login, true))
                    // authAPI.getAuthId(id)
                    //     .then(response => {
                    //         dispatch(setAuthUserPhoto(response.data.photos.large))
                    //     });
                }
            })
}


export const authorization = (authorizationModel: authorizationModelType) => {
    return (dispatch: any) => {
        authAPI.loginPost(authorizationModel)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthMe())
                } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
            })
    }
}

export const loginOut = () => {
    return (dispatch: any) => {
        authAPI.loginOut()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                    dispatch(setAuthUserPhoto(null))
                }
            })
    }
}