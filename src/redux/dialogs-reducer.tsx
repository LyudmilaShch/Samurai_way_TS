import {ActionsTypes, DialogPageType, MessagesType, PostsType} from "./State";

export const DialogsReducer = (state: DialogPageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage: MessagesType = {
                id: 5,
                name: "Leo",
                message: action.messageText,
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            };
            state.messages.push(newMessage);
            state.newMessageText = " ";
            return state;
        case 'UPDATE-MESSAGE-TEXT':
            state.newMessageText = action.newMessageText;
            return state;
        default:
            return state;
    }
}

export const SendMessageCreator = (messageText: string) =>
    ({
        type: 'SEND-MESSAGE',
        messageText: messageText
    }) as const

export const UpdateMessageTextCreator = (newMessageText: string) =>
    ({
        type: 'UPDATE-MESSAGE-TEXT',
        newMessageText: newMessageText
    }) as const