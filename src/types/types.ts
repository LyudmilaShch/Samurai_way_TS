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
    "photos": PhotoType
}
export type PhotoType = {
    small: string | null,
    large: string | null
}
export type PostsType = {
    id: number,
    message: string,
    avatar: string,
    countlike: number
}
export type UsersType = {
    id: number,
    followed: boolean,
    name: string
    photos?: PhotoType
    avatar: string
    status: string,
    location: {
        city: string,
        country: string
    }
}