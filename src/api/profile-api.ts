import {PhotoType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseDataType = {photos: PhotoType}
export const profileAPI = {
    getProfileUserId(userId: string) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: status}).then(res => res.data)
    },
    savePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`/profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('/profile', profile).then(res => res.data)
    }
}