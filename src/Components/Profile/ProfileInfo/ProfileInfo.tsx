import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";

type ProfileInfoType = {
    profile: ProfileType
}

export const ProfileInfo = (props: ProfileInfoType) => {
    debugger
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div>
                    <img className={s.img_forest}
                         src='https://abrakadabra.fun/uploads/posts/2022-01/1643659835_9-abrakadabra-fun-p-dlinnii-fon-lesa-17.jpg'/>
                </div>
                <div className={s.descriptionblock}>
                    <img className={s.img}
                         src={props.profile.photos.large}/>
                    Name: {props.profile.fullName}
                </div>

            </div>
        )
    }
}