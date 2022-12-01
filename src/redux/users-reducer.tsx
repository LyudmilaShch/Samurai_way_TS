import {ActionsTypes} from "./store";
import {usersAPI} from "../api/api";


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
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<any>
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
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE-IS-FOLLOWING-IN-PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) =>
    ({
        type: 'FOLLOW',
        userId: userId
    }) as const


export const unfollowSuccess = (userId: number) =>
    ({
        type: 'UNFOLLOW',
        userId: userId
    }) as const

export const setUsers = (users: Array<UsersType>) =>
    ({
        type: 'SET-USERS',
        users: users
    }) as const
export const setCurrentPage = (currentPage: number) =>
    ({
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    }) as const

export const setTotalUsersCount = (totalCount: number) =>
    ({
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount: totalCount
    }) as const

export const toggleIsFetching = (isFetching: boolean) =>
    ({
        type: 'TOGGLE-IS-FETCHING',
        isFetching: isFetching

    }) as const

export const toggleInFollowingInProgress = (isFetching: boolean, userId: number) =>
    ({
        type: 'TOGGLE-IS-FOLLOWING-IN-PROGRESS',
        isFetching: isFetching,
        userId: userId
    }) as const


export const getUsers = (currentPage: number, pageSize: number) => {

    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        });
    }
}

export const follow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleInFollowingInProgress(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleInFollowingInProgress(false, userId))
            });
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleInFollowingInProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleInFollowingInProgress(false, userId))
            });
    }
}