import {ActionsTypes} from "./store";


export type UsersType = {
    id: number,
    followed: boolean,
    name: string
    photos?: {
        small: string | null,
        large: string | null
    }
    avatar: string
    status: string,
    location: {
        city: string,
        country: string
    }
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}
export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
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
            return {...state, users: [...action.users]}
        }
        case 'SET-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.totalCount}
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
export const setCurrentPageAC = (currentPage: number) =>
    ({
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    }) as const

export const setUsersTotalCountAC =  (totalCount: number) =>
    ({
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount: totalCount
    }) as const



