import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

type ProfileType = {
    posts: PostsType[],
}

type PostsType = {
    id: number,
    message: string,
    avatar: string,
    countlike: number
}

export const Profile = (props: ProfileType) => {
      return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
}