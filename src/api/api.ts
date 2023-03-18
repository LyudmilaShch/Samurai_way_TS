import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
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

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>,
    resultCode: RC,
}