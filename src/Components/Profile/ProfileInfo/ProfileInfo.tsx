import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void
}

export const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoType) => {
    if (!profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div className={s.descriptionBlock}>
                    <div className={s.profileImg}>
                        <img className={s.img}
                             src={profile.photos.large  !== null ? profile.photos.large : userPhoto}/>
                    </div>
                   <div className={s.profileDescription}>
                       Name: {profile.fullName}
                       <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                       <br/>
                       About me: {profile.aboutMe}
                   </div>
                </div>
            </div>
        )
    }
}