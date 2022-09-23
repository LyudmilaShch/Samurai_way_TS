import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div>
            <div>
                <img className={s.img_forest}
                     src='https://abrakadabra.fun/uploads/posts/2022-01/1643659835_9-abrakadabra-fun-p-dlinnii-fon-lesa-17.jpg'/>
            </div>
            <div>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
}