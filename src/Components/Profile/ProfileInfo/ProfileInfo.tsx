import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

export const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}: ProfileInfoType) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
        }

    }
        return (
            <div>
                <div className={s.descriptionBlock}>
                    <div className={s.profileImg}>
                        <img className={s.img}
                             src={profile.photos.large || userPhoto}/>
                    </div>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
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
