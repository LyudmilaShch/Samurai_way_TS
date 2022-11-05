import {ActionsTypes, MessagesType} from "./store";

export type DialogType = {
    id: number,
    name: string,
    avatar: string
}

let initialState: InitialStateType  = {
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
}

export type InitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessagesType>
    newMessageText: string
}

export const DialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
        switch (action.type) {
        case 'SEND-MESSAGE': {
            const newMessage: MessagesType = {
                id: 5,
                name: "Leo",
                message: action.messageText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            };
            return {...state, newMessageText: " ", messages: [...state.messages, newMessage]}

        }
        case 'UPDATE-MESSAGE-TEXT':{
            return {...state, newMessageText: action.newMessageText};
                   }

        default:
            return state;
    }
}

export const SendMessageCreator = (newMessageText: string) =>
    ({
        type: 'SEND-MESSAGE',
        messageText: newMessageText
    }) as const

export const UpdateMessageTextCreator = (newMessageText: string) =>
    ({
        type: 'UPDATE-MESSAGE-TEXT',
        newMessageText: newMessageText
    }) as const