import {usersAPI} from "../api/api";
import {ThunkType, UsersType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./redux-store";

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

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    followSuccess: (userId: number) => ({
        type: 'FOLLOW',
        userId: userId
    }) as const,
    unfollowSuccess: (userId: number) => ({
        type: 'UNFOLLOW',
        userId: userId
    }) as const,
    setUsers: (users: Array<UsersType>) => ({
        type: 'SET-USERS',
        users: users
    }) as const,
    setCurrentPage: (currentPage: number) => ({
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    }) as const,
    setTotalUsersCount: (totalCount: number) => ({
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount: totalCount
    }) as const,

    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE-IS-FETCHING',
        isFetching: isFetching

    }) as const,

    toggleInFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE-IS-FOLLOWING-IN-PROGRESS',
        isFetching: isFetching,
        userId: userId
    }) as const
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersAPI.requestUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleInFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleInFollowingInProgress(false, userId))
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess)
}