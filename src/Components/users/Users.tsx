import React from 'react'
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {followAPI} from "../../api/api";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    followingInProgress: Array<number>,
    toggleInFollowingInProgress:  (isFetching: boolean, userId: number) => void
}


export let Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return <div>
        <div>
            {slicedPages.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : " "}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p} </span>
            })}
        </div>
        {
            props.users.map(u =>
                <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos?.small !== null ? u.photos?.small : userPhoto}
                                     className={s.userAvatar}/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    ? <button
                                        disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                        followAPI.unfollow(props.unfollow, u.id, props.toggleInFollowingInProgress);

                                    }}>Unfollow</button>
                                    : <button
                                        disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                        followAPI.follow(props.follow, u.id,  props.toggleInFollowingInProgress);
                                    }}>Follow</button>}
                            </div>
                        </span>
                    <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                    </span>
                </div>
            )
        }
    </div>
}