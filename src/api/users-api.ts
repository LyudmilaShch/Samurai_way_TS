import {GetItemsType, instance, APIResponseType} from "./api";

export const usersApi = {
    requestUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponseType>

    },
    follow(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`).then(res => res.data)
    }
}