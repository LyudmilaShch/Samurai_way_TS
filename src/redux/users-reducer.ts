import {UsersType} from "../types/types";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersApi} from "../api/users-api";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>//array of users ids
}
type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USER/FOLLOW':
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
        case 'SN/USER/UNFOLLOW': {
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
        case 'SN/USER/SET-USERS': {
            return {...state, users: [...action.users]}
        }
        case 'SN/USER/SET-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/USER/SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.totalCount}
        }
        case 'SN/USER/TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USER/TOGGLE-IS-FOLLOWING-IN-PROGRESS': {
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


export const actions = {
    followSuccess: (userId: number) => ({
        type: 'SN/USER/FOLLOW',
        userId: userId
    }) as const,
    unfollowSuccess: (userId: number) => ({
        type: 'SN/USER/UNFOLLOW',
        userId: userId
    }) as const,
    setUsers: (users: Array<UsersType>) => ({
        type: 'SN/USER/SET-USERS',
        users: users
    }) as const,
    setCurrentPage: (currentPage: number) => ({
        type: 'SN/USER/SET-CURRENT-PAGE',
        currentPage: currentPage
    }) as const,
    setTotalUsersCount: (totalCount: number) => ({
        type: 'SN/USER/SET-TOTAL-USERS-COUNT',
        totalCount: totalCount
    }) as const,

    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USER/TOGGLE-IS-FETCHING',
        isFetching: isFetching

    }) as const,

    toggleInFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USER/TOGGLE-IS-FOLLOWING-IN-PROGRESS',
        isFetching: isFetching,
        userId: userId
    }) as const
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersApi.requestUsers(page, pageSize)
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
    _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(userId), actions.followSuccess)
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(userId), actions.unfollowSuccess)
}