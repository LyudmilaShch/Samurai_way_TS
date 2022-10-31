import {ActionsTypes, PostsType, ProfilePageType} from "./store";

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
        newPostText: " "
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    debugger;
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