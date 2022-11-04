import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfileType = {
   // store: StoreType

}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
              //  store={props.store}
               />
        </div>
    )
}