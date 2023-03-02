import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "ea3d9034-c1d2-4af3-a252-178ff469f42f"}
});

export type authorizationModelType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const usersAPI = {
    requestUsers(currentPage: number = 1, pageSize: number = 10) {
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
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put(`/profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('/profile', profile)
    }
}
export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },
    getAuthId(id: number) {
        return instance.get(`profile/` + id)
    },
    loginPost(authorizationModel: authorizationModelType) {
        return instance.post(`auth/login`, {
                email: authorizationModel.email,
                password: authorizationModel.password,
                rememberMe: authorizationModel.rememberMe,
                captcha: authorizationModel.captcha
            }
        )
    },
    loginOut() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}