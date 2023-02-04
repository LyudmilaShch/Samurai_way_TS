import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileDataFormReduxForm} from "./ProfileData/ProfileDataForm";

type ProfileInfoType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => void
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
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // @ts-ignore
        saveProfile(formData).then(
            () => {
            setEditMode(false)
        })
        }


    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.profileImg}>
                    <img className={s.img}
                         src={profile.photos.large || userPhoto}/>
                </div>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataFormReduxForm onSubmit={onSubmit}
                                                initialValues={profile}
                                                profile={profile}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}
            </div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
}

const ProfileData = ({
                         profile,
                         isOwner,
                         goToEditMode
                     }: { profile: ProfileType, isOwner: boolean, goToEditMode: () => void }) => {
    return <div className={s.profileDescription}>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <b>Name: </b>{profile.fullName}
        <br/>
        <div>
            <b>About me: </b>{profile.aboutMe}
        </div>
        <div>
            <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob && <div>
            <b>My professional skills: </b>{profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key}
                            contactValue={profile.contacts[key as keyof typeof contactsValues]}/>
        })}
        </div>
    </div>
}
export const Contact = ({contactTitle, contactValue}: { contactTitle: string, contactValue: string }) => {
    return (
        <div>
            <div className={s.contact}><b>{contactTitle}</b>:</div>
            <div>{contactValue}</div>
        </div>
    )
}

