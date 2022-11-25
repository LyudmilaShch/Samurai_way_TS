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
    }
}
export const profileAPI = {
    getProfileUserId(setUserProfile: (profile: ProfileType) => void, userId: string) {
        instance.get(`profile/` + userId)
            .then(response => {
                setUserProfile(response.data)
            });
    }
}
export const followAPI = {
    unfollow(unfollow: (userId: number) => void, userID: number) {
        debugger
        instance.delete(`follow/${userID}`)
            .then(response => {
                if (response.data.resultCode == 0) {
                    unfollow(userID)
                }
            });
    },
    follow(follow: (userId: number) => void, userID: number) {
        instance.post(`follow/${userID}`)
            .then(response => {
                if (response.data.resultCode == 0) {
                    follow(userID)
                }
            });
    }
}