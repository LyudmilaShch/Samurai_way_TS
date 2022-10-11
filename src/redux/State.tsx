import React from 'react';

let renderEntireTree = () => {
    console.log('State changed');
}


export type DialogType = {
    id: number,
    name: string,
    avatar: string
}

export type MessagesType = {
    id: number,
    name: string,
    message: string,
    avatar: string
}
export type PostsType = {
    id: number,
    message: string,
    avatar: string,
    countlike: number
}
export type SidebarType = {
    id: number,
    name: string,
    avatar: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>,
    messages: Array<MessagesType>
    newMessageText: string
}
export type NavbarPageType = {
    sidebar: Array<SidebarType>
}
export type RootStateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogPageType,
    navbarPage: NavbarPageType
}

export let state: RootStateType = {
    profilePage: {
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
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Rabbit', avatar: "https://www.belanta.vet/vet-blog/wp-content/uploads/2019/11/1-6.jpg"},
            {id: 2, name: 'Leo', avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"},
            {
                id: 3,
                name: 'Mouse',
                avatar: "https://st3.depositphotos.com/4431055/12920/i/600/depositphotos_129204976-stock-photo-gray-mouse-animal-and-cheese.jpg"
            },
            {id: 4, name: 'Wolf', avatar: "https://proza.ru/pics/2008/01/15/398.jpg"},
            {id: 5, name: 'Squirrel', avatar: "http://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg"}
        ],
        messages: [
            {
                id: 1,
                name: 'Rabbit',
                message: 'Hi',
                avatar: "https://www.belanta.vet/vet-blog/wp-content/uploads/2019/11/1-6.jpg"
            },
            {
                id: 2,
                name: 'Leo',
                message: 'How is your IT',
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"
            },
            {
                id: 3,
                name: 'Rabbit',
                message: 'Ok',
                avatar: "https://www.belanta.vet/vet-blog/wp-content/uploads/2019/11/1-6.jpg"
            },
            {
                id: 4,
                name: 'Leo',
                message: 'Yo',
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"
            },
            {
                id: 5,
                name: 'Rabbit',
                message: 'Yo',
                avatar: "https://www.belanta.vet/vet-blog/wp-content/uploads/2019/11/1-6.jpg"
            },
            {
                id: 6,
                name: 'Leo',
                message: 'Bye',
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"
            }
        ],
        newMessageText: " "
    },
    navbarPage: {
        sidebar: [
            {id: 1, name: 'Rabbit', avatar: "https://www.belanta.vet/vet-blog/wp-content/uploads/2019/11/1-6.jpg"},
            {id: 2, name: 'Leo', avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"},
            {
                id: 3,
                name: 'Mouse',
                avatar: "https://st3.depositphotos.com/4431055/12920/i/600/depositphotos_129204976-stock-photo-gray-mouse-animal-and-cheese.jpg"
            }
        ]
    },

}

export const addPost = () => {

    const newPost: PostsType = {
        id: 5,
        message: state.profilePage.newPostText,
        avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
        countlike: 0
    };

    renderEntireTree();

    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = " ";

}

export const updateNewPostText = (newText: string) => {
state.profilePage.newPostText = newText;
    renderEntireTree();

}

export const sendMessage = (messageText: string) => {

const newMessage: MessagesType = {
    id: 5,
    name: "Leo",
    message: messageText,
    avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
};
    renderEntireTree();

    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText = " ";

}

export const updateMessageText = (newMessageText: string) => {
    state.dialogsPage.newMessageText = newMessageText;
    renderEntireTree();
}

export const subscribe = (observer: () => void) => {
    renderEntireTree = observer; //наблюдатель
}