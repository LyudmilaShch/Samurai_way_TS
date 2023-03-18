import {authorizationModelType, instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = {

    userId: number

}
export const authAPI = {
    getAuthMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    getAuthId(id: number) {
        return instance.get(`profile/` + id)
    },
    loginPost(authorizationModel: authorizationModelType) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
                email: authorizationModel.email,
                password: authorizationModel.password,
                rememberMe: authorizationModel.rememberMe,
                captcha: authorizationModel.captcha
            }
        ).then(res => res.data)
    },
    loginOut() {
        return instance.delete(`auth/login`)
    }
}