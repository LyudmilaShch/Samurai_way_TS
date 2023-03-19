import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../types/types";


type ProfilePropsType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>

}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                         isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>

        </div>
    )
}