import React from 'react'
import s from "./Users.module.scss";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../types/types";

export type UsersPropsType = {
    user: UsersType
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}


export let User = ({
                       user,
                       follow,
                       unfollow,
                       followingInProgress,
                       ...props
                   }: UsersPropsType) => {
    return <div className={s.userBlock}>
        <div className={s.userInformationContainer}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos?.small !== null ? user.photos?.small : userPhoto}
                         className={s.userAvatar}/>
                </NavLink>
            </div>
            <span>
                                <span>
                                    <h5>{user.name}</h5>
                                    <div className={s.userInfo}>{user.status}</div>
                                </span>
                                <span>
                                    <div className={s.userInfo}>{'u.location.country'}</div>
                                    <div className={s.userInfo}>{'u.location.city'}</div>
                                </span>
                            </span>
        </div>
        <div>
            {user.followed
                ? <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                        unfollow(user.id)
                    }}
                    className={user.followed ? s.followedButton : s.unfollowedButton}
                >Unfollow</button>
                : <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                        follow(user.id)
                    }}
                    className={user.followed ? s.followedButton : s.unfollowedButton}
                >Add friend</button>}
        </div>
    </div>

}