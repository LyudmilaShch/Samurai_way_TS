import axios from "axios";
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "ea3d9034-c1d2-4af3-a252-178ff469f42f"}
});

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`)

    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`)
    }
}
export const profileAPI = {
    getProfileUserId(userId: string) {
      return instance.get(`profile/` + userId)

    }
}
export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },
    getAuthId(id: number) {
        return instance.get(`profile/` + id)
    }

}