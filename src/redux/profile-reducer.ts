import {FormAction, stopSubmit} from "redux-form";
import {PhotoType, PostsType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


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
            avatar: "https://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg",
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

export const ProfileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            const newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
                countlike: 0
            };
            return {...state, posts: [newPost, ...state.posts], newPostText: ''};
        }
        case 'SN/PROFILE/DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'SN/PROFILE/SET-USER-PROFILE': {
            return {...state, profile: {...action.profile}}
        }
        case 'SN/PROFILE/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'SN/PROFILE/SAVE-PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileType}
        }
        default:
            return state;


    }
}

export const actions = {
    addPostCreator: (newPostText: string) =>
        ({
            type: 'SN/PROFILE/ADD-POST',
            newPostText: newPostText
        }) as const,


    deletePostCreator: (postId: number) =>
        ({
            type: 'SN/PROFILE/DELETE-POST',
            postId
        }) as const,

    setUserProfile: (profile: ProfileType) =>
        ({
            type: 'SN/PROFILE/SET-USER-PROFILE',
            profile: profile
        }) as const,


    setStatus: (status: string) =>
        ({
            type: 'SN/PROFILE/SET-STATUS',
            status: status
        }) as const,


    savePhotoSuccess: (photo: PhotoType) =>
        ({
            type: 'SN/PROFILE/SAVE-PHOTO_SUCCESS',
            photo
        }) as const

}


export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfileUserId(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    try {
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        } else if (data.resultCode === 1) {
            alert(data.messages)
        }
    } catch (err: any) {
        alert(err.message)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.data.userid
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("edit-profile", {_error: message}))
        return Promise.reject()
    }
}

// types
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType= BaseThunkType<ActionsTypes | FormAction>