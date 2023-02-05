import {ActionsTypes} from "./store";
import {authAPI, authorizationModelType, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {ProfileType} from "./profile-reducer";


export type AuthType = {
    "login": string | null,
    isAuth: boolean,
    photo: string | null
    loginOut: () => void

    profile?: ProfileType
}

let initialState = {
    data: {
        userid: null,
        email: null,
        login: null,
        isAuth: false,
    },
    photo: null,
    captchaUrl: null
}

export type InitialStateType = {
    data: {
        userid: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    },
    photo: string | null
    captchaUrl: string | null
}

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'auth/SET-USER-DATA':
            return {
                ...state, data: {...action.data}
            }
        case 'auth/SET-AUTH-USER-PHOTO':
            return {...state, photo: action.photo}
        case 'auth/GET-CAPTCHA-URL-SUCCESS':
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setAuthUserData = (userid: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
        type: 'auth/SET-USER-DATA',
        data: {userid, email, login, isAuth}
    }) as const

export const setAuthUserPhoto = (photo: string | null) =>
    ({
        type: 'auth/SET-AUTH-USER-PHOTO',
        photo: photo
    }) as const

export const getCaptchaUrlSuccess = (captchaUrl: string | null) =>
    ({
        type: 'auth/GET-CAPTCHA-URL-SUCCESS',
        payload: {captchaUrl}
    }) as const

export const getAuthMe = () => async (dispatch: Dispatch) => {
    let response = await authAPI.getAuthMe()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const authorization = (authorizationModel: authorizationModelType) => async (dispatch: any) => {
    let response = await authAPI.loginPost(authorizationModel)
    if (response.data.resultCode === 0) {
        dispatch(getAuthMe())
    } else {
        if (response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const loginOut = () => async (dispatch: any) => {
    let response = await authAPI.loginOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
        dispatch(setAuthUserPhoto(null))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}