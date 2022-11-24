import {ActionsTypes} from "./store";

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