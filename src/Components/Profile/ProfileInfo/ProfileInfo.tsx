import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.scss';
import {Preloader} from "../../common/preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileDataFormReduxForm} from "./ProfileData/ProfileDataForm";
import changeAvatarImg from "../../../assets/images/camera.png"
import {ReactComponent as Calendar} from "../../../assets/images/calendar.svg";
import {ReactComponent as Person} from "../../../assets/images/person.svg";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";
import {ProfileType} from "../../../types/types";


type ProfileInfoType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}

let contactsValues = {
    facebook: '',
    website: '',
    vk: '',
    twitter: '',
    instagram: '',
    youtube: '',
    github: '',
    mainLink: ''
}

export const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoType) => {
    const [editMode, setEditMode] = useState(false)
    const [isPostsPage, setIsPostsPage] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            })
    }


    return (
        <div className={s.profileInfo}>
            <div className={s.profileImg}></div>
            <div className={s.profileDataContainer}>
                <div className={s.profileCenterBlock}>
                    <div className={s.profileAvatar}>
                        {isOwner &&
                            <div className={s.inputChangeAvatar}>
                                <label>
                                    <input type={"file"} onChange={onMainPhotoSelected} style={{display: 'none'}}/>
                                    <span className="input__file-icon-wrapper">
                                    <img src={changeAvatarImg}/>
                                 </span>
                                </label>
                            </div>
                        }
                        <img className={s.avatar}
                             src={profile.photos.large || userPhoto}/>
                    </div>
                    <h5>{profile.fullName}</h5>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
            </div>

            <div className={s.iconList}>
                <div className={s.iconContainer}>
                    <button onClick={() => {
                        setIsPostsPage(false)
                    }}>
                        <Person className={isPostsPage ? s.icon : s.iconActive}/>
                        <p>About me</p>
                    </button>
                </div>
                <div className={s.iconContainer}>
                    <button onClick={() => {
                        setIsPostsPage(true)
                    }}>
                        <Calendar className={isPostsPage ? s.iconActive : s.icon}/>
                        <p>Posts</p>
                    </button>
                </div>
            </div>
            {isPostsPage && <MyPostsContainer/>}
            {!isPostsPage &&
                <div>
                    <div className={s.profileData}>
                        {editMode
                            ? <ProfileDataFormReduxForm onSubmit={onSubmit}
                                                        initialValues={profile}
                                                        profile={profile}/>
                            : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                                setEditMode(true)
                            }}/>}
                    </div>
                </div>
            }

        </div>
    )
}

type ProfileDataType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}
const ProfileData = ({
                         profile,
                         isOwner,
                         goToEditMode
                     }: ProfileDataType) => {
    return <div className={s.profileDescription}>
        <div className={s.block}>
            <h5>Personal information</h5>
        </div>
        <div className={s.block}>
            <div>
                <div className={s.nameDescription}>Full name</div>
                <p>{profile.fullName}</p>
            </div>
            <div>
                <div className={s.nameDescription}>About me</div>
                <p>{profile.aboutMe}</p>
            </div>
            <div>
                <div className={s.nameDescription}>Looking for a job</div>
                <p>{profile.lookingForAJob ? 'yes' : 'no'}</p>
            </div>
            {profile.lookingForAJob && <div>
                <div className={s.nameDescription}>My professional skills</div>
                <p>{profile.lookingForAJobDescription}</p>
            </div>}
        </div>
        <div>
            <div className={s.block}>
                <h5>Contacts</h5>
            </div>
            <div className={s.block}>
                <p>{Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof typeof contactsValues]}/>
                })}</p>
                {isOwner && <div>
                    <button onClick={goToEditMode}>Edit profile</button>
                </div>}
            </div>
        </div>
    </div>
}


export const Contact = ({contactTitle, contactValue}: { contactTitle: string, contactValue: string }) => {
    return (
        <div>
            <div className={s.nameDescription}>{contactTitle}</div>
            <p>{contactValue}</p>
        </div>
    )
}

