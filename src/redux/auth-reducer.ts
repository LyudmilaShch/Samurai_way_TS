import {authorizationModelType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ProfileType} from "../types/types";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

export type AuthType = {
    "login": string | null,
    isAuth: boolean,
    photo: string | null
    loginOut: () => void

    profile: ProfileType | null
}

let initialState: InitialStateType = {
    data: {
        userid: null,
        email: null,
        login: null,
        isAuth: false,
    },
    photo: null,
    captchaUrl: null
}


export const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET-USER-DATA':
            return {
                ...state, data: {...action.data}
            }
        case 'SN/auth/SET-AUTH-USER-PHOTO':
            return {...state, photo: action.photo}
        case 'SN/auth/GET-CAPTCHA-URL-SUCCESS':
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userid: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({
            type: 'SN/auth/SET-USER-DATA',
            data: {userid, email, login, isAuth}
        }) as const,

    setAuthUserPhoto: (photo: string | null) =>
        ({
            type: 'SN/auth/SET-AUTH-USER-PHOTO',
            photo: photo
        }) as const,

    getCaptchaUrlSuccess: (captchaUrl: string | null) =>
        ({
            type: 'SN/auth/GET-CAPTCHA-URL-SUCCESS',
            payload: {captchaUrl}
        }) as const
}


export const getAuthMe = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.getAuthMe()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}


export const authorization = (authorizationModel: authorizationModelType): ThunkType => async (dispatch) => {
    let data = await authAPI.loginPost(authorizationModel)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthMe())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const loginOut = (): ThunkType => async (dispatch) => {
    let response = await authAPI.loginOut()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
        dispatch(actions.setAuthUserPhoto(null))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

//TYPES
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
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType= BaseThunkType<ActionsTypes | FormAction>