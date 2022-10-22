import React from 'react';

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
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof SendMessageActionCreator>
    | ReturnType<typeof UpdateMessageTextActionCreator>


export const addPostActionCreator = (newPostText: string) =>
    ({
        type: 'ADD-POST',
        newPostText: newPostText
    }) as const

export const UpdateNewPostTextActionCreator = (newText: string) =>
    ({
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    }) as const

export const SendMessageActionCreator = (messageText: string) =>
    ({
        type: 'SEND-MESSAGE',
        messageText: messageText
    }) as const

export const UpdateMessageTextActionCreator = (newMessageText: string) =>
    ({
        type: 'UPDATE-MESSAGE-TEXT',
        newMessageText: newMessageText
    }) as const

export const store: StoreType = {
    _state: {
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

    },
    _callSubscriber() {
        console.log('State changed');
    },

    subscribe(observer) {
        this._callSubscriber = observer; //наблюдатель
    },
    getState() {
        return this._state
    },


    dispatch(action: ActionsTypes) {

        if (action.type === 'ADD-POST') {
            debugger
            const newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
                countlike: 0
            };

            this._callSubscriber();
            this._state.profilePage.posts.unshift(newPost);
            this._state.profilePage.newPostText = " ";

        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber();

        } else if (action.type === 'SEND-MESSAGE') {
            const newMessage: MessagesType = {
                id: 5,
                name: "Leo",
                message: action.messageText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            };
            this._callSubscriber();

            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessageText = " ";
        } else if (action.type === 'UPDATE-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newMessageText;
            this._callSubscriber();
        }
    }

}

