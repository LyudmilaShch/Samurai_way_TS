import {ActionsTypes, PostsType, ProfilePageType} from "./State";

export const ProfileReducer = (state: ProfilePageType, action: ActionsTypes) => {
switch (action.type){
    case 'ADD-POST':
        const newPost: PostsType = {
            id: 5,
            message: action.newPostText,
            avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            countlike: 0
        };
        state.posts.unshift(newPost);
        state.newPostText = " ";
        return state;
    case 'UPDATE-NEW-POST-TEXT':
        state.newPostText = action.newText;
        return state;
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