import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void
}

export const ProfileInfo = (props: ProfileInfoType) => {

    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                {/*<div>*/}
                {/*    <img className={s.img_forest}*/}
                {/*         src='https://abrakadabra.fun/uploads/posts/2022-01/1643659835_9-abrakadabra-fun-p-dlinnii-fon-lesa-17.jpg'/>*/}
                {/*</div>*/}
                <div className={s.descriptionBlock}>
                    <div className={s.profileImg}>
                        <img className={s.img}
                             src={props.profile.photos.large  !== null ? props.profile.photos.large : userPhoto}/>
                    </div>
                   <div className={s.profileDescription}>
                       Name: {props.profile.fullName}
                       <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                       <br/>
                       About me: {props.profile.aboutMe}
                   </div>

                </div>

            </div>
        )
    }
}