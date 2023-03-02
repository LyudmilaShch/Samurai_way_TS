import {ActionsTypes} from "./store";
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotoType, PostsType, ProfileType, ThunkType} from "../types/types";


let initialState = {
    posts: [
        {
            id: 1,
            message: "Fur-fur-fur",
            avatar: "https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg",
            countlike: 5
        },
        {
            id: 2,
            message: "Keooo-keooo",
            avatar: "http://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg",
            countlike: 7
        },
        {
            id: 3,
            message: "R-r-r-r-r-r",
            avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            countlike: 15
        },
        {
            id: 4,
            message: "I am deer",
            avatar: "https://www.kalashnikov.ru/wp-content/uploads/2021/04/natsionalnyi-park-ssha-priroda-1024x1024.jpg",
            countlike: 12
        },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: " ",
    newPostText: " ",
    photos: " "
}
export type InitialStateType = typeof initialState

export const ProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
                countlike: 0
            };
            return {...state, posts: [newPost, ...state.posts], newPostText: ''};
        }
        case 'DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: {...action.profile}}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'SAVE-PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileType}
        }
        default:
            return state;


    }
}

type addPostCreatorActionType = {
    type: 'ADD-POST',
    newPostText: string
}
export const addPostCreator = (newPostText: string): addPostCreatorActionType =>
    ({
        type: 'ADD-POST',
        newPostText: newPostText
    }) as const

type deletePostCreatorActionType = {
    type: 'DELETE-POST',
    postId: number
}
export const deletePostCreator = (postId: number): deletePostCreatorActionType =>
    ({
        type: 'DELETE-POST',
        postId
    }) as const

type setUserProfileActionType = {
    type: 'SET-USER-PROFILE',
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): setUserProfileActionType =>
    ({
        type: 'SET-USER-PROFILE',
        profile: profile
    }) as const

type setStatusActionType = {
    type: 'SET-STATUS',
    status: string
}
export const setStatus = (status: string): setStatusActionType =>
    ({
        type: 'SET-STATUS',
        status: status
    }) as const


type savePhotoSuccessActionType = {
    type: 'SAVE-PHOTO_SUCCESS',
    photo: PhotoType
}
export const savePhotoSuccess = (photo: PhotoType): savePhotoSuccessActionType =>
    ({
        type: 'SAVE-PHOTO_SUCCESS',
        photo
    }) as const


export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfileUserId(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    try {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        } else if (response.data.resultCode === 1) {
            alert(response.data.messages)
        }
    } catch (err: any) {
        alert(err.message)
    }

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.data.userid
    console.log(userId)
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("edit-profile", {_error: message}))
        return Promise.reject()
    }
}