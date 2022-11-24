import {ActionsTypes} from "./store";


let initialState = {
    userid: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateType = {
    userid: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state, ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userid: number, email: string, login: string) =>
    ({
        type: 'SET-USER-DATA',
        data: {userid, email, login}
    }) as const
