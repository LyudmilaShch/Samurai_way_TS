import {ActionsTypes} from "./store";
import {authAPI, authorizationModelType} from "../api/api";
import {setStatus} from "./profile-reducer";


export type AuthType = {
    "login": string | null,
    isAuth: boolean,
    photo: string | null
}

let initialState = {
    data: {
        userid: null,
        email: null,
        login: null
    },
    isAuth: false,
    photo: null
}

export type InitialStateType = {
    data: {
        userid: number | null,
        email: string | null,
        login: string | null
    },
    isAuth: boolean,
    photo: string | null
}

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state, data: {...action.data},
                isAuth: true
            }
        case 'SET-AUTH-USER-PHOTO':
            return {...state, photo: action.photo}

        default:
            return state;
    }
}

export const setAuthUserData = (userid: number, email: string, login: string) =>
    ({
        type: 'SET-USER-DATA',
        data: {userid, email, login}
    }) as const

export const setAuthUserPhoto = (photo: string) =>
    ({
        type: 'SET-AUTH-USER-PHOTO',
        photo: photo
    }) as const


export const getAuthMe = () => {
    return (dispatch: any) => {
        authAPI.getAuthMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserData(id, email, login))
                    authAPI.getAuthId(id)
                        .then(response => {
                            dispatch(setAuthUserPhoto(response.data.photos.large))
                        });
                }
            })
    }
}