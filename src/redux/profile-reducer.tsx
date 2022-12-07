import {ActionsTypes} from "./store";
import {profileAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./users-reducer";

export type ProfileType = {
    "aboutMe": string,
    "contacts": {
        "facebook": string,
        "website": string,
        "vk": string,
        "twitter": string,
        "instagram": string,
        "youtube": string,
        "github": string,
        "mainLink": string
    },
    "lookingForAJob": boolean,
    "lookingForAJobDescription": string,
    "fullName": string,
    "userId": number,
    "photos": {
        "small": string,
        "large": string
}}

export type PostsType = {
    id: number,
    message: string,
    avatar: string,
    countlike: number
}

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
    ],
    newPostText: " ",
    profile:  null,
    status: " "
}
export type InitialStateType = {
    posts: Array<PostsType>
    newPostText: string
    profile: any,
    status: string
}

export const ProfileReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST':{
            const newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
                countlike: 0
            };
            return {...state, posts: [newPost, ...state.posts], newPostText: ''};
    }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText};
        }
        case 'SET-USER-PROFILE': {
            return {...state, profile: {...action.profile}}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state;


    }
}

export const addPostCreator = (newPostText: string) =>
    ({
        type: 'ADD-POST',
        newPostText: newPostText
    }) as const

export const UpdateNewPostTextCreator = (newText: string) =>
    ({
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    }) as const

export const setUserProfile = (profile: ProfileType) =>
    ({
        type: 'SET-USER-PROFILE',
        profile: profile
    }) as const

export const setStatus = (status: string) =>
    ({
        type: 'SET-STATUS',
        status: status
    }) as const

export const getUserProfile = (userId: string) => {
    return (dispatch: any) => {
        profileAPI.getProfileUserId(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            });
    }
}

export const getStatus = (userId: string) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            });
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: any) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0){
                    dispatch(setStatus(status))
                }
            });
    }
}