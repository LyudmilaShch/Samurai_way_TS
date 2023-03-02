import {ActionsTypes} from "./store";
import {usersAPI} from "../api/api";
import { UsersType} from "../types/types";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>//array of users ids
}
type InitialStateType = typeof initialState

export const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                //users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'UNFOLLOW': {
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
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
            } as InitialStateType
        }
        default:
            return state;
    }
}

type followSuccessActionType = {
    type: 'FOLLOW',
    userId: number
}

export const followSuccess = (userId: number): followSuccessActionType =>
    ({
        type: 'FOLLOW',
        userId: userId
    }) as const

type unfollowSuccessActionType = {
    type: 'UNFOLLOW',
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType =>
    ({
        type: 'UNFOLLOW',
        userId: userId
    }) as const

type setUsersActionType = {
    type: 'SET-USERS',
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): setUsersActionType =>
    ({
        type: 'SET-USERS',
        users: users
    }) as const

type setCurrentPageActionType = {
    type: 'SET-CURRENT-PAGE',
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType =>
    ({
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    }) as const


type setTotalUsersCountActionType = {
    type: 'SET-TOTAL-USERS-COUNT',
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountActionType =>
    ({
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount: totalCount
    }) as const

type toggleIsFetchingActionType = {
    type: 'TOGGLE-IS-FETCHING',
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType =>
    ({
        type: 'TOGGLE-IS-FETCHING',
        isFetching: isFetching

    }) as const

type toggleInFollowingInProgressActionType = {
    type: 'TOGGLE-IS-FOLLOWING-IN-PROGRESS',
    isFetching: boolean,
    userId: number
}
export const toggleInFollowingInProgress = (isFetching: boolean, userId: number): toggleInFollowingInProgressActionType =>
    ({
        type: 'TOGGLE-IS-FOLLOWING-IN-PROGRESS',
        isFetching: isFetching,
        userId: userId
    }) as const


export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.requestUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleInFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleInFollowingInProgress(false, userId))
}
export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess)
}
export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess)
}