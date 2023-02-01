import React from 'react'
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

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
    return <div>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos?.small !== null ? user.photos?.small : userPhoto}
                                     className={s.userAvatar}/>
                                </NavLink>
                            </div>
                            <div>
                                {user.followed
                                    ? <button
                                        disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            unfollow(user.id)
                                        }}>Unfollow</button>
                                    : <button
                                        disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {
                                            follow(user.id)
                                        }}>Follow</button>}
                            </div>
                        </span>
        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                    </span>
    </div>

}