import {ActionsTypes} from "./store";


export type UsersType = {
    id: number,
    followed: boolean,
    fullName: string
    avatar: string,
    status: string,
    location: {
        city: string,
        country: string
    }
}

let initialState = {
     users: [

    ]
}
export type InitialStateType = {
    users: Array<UsersType>
}

export const UsersReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case 'SET-USERS': {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export const followAC = (userId: number) =>
    ({
        type: 'FOLLOW',
        userId: userId
    }) as const

export const unfollowAC = (userId: number) =>
    ({
        type: 'UNFOLLOW',
        userId: userId
    }) as const

export const setUsersAC = (users: Array<UsersType>) =>
    ({
        type: 'SET-USERS',
        users: users
    }) as const
