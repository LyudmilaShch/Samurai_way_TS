import React from 'react'
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
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
                                    ? <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                            withCredentials: true, //мы должны быть залогиниными
                                            headers: {"API-KEY": "ea3d9034-c1d2-4af3-a252-178ff469f42f"}
                                        })
                                            .then(response => {
                                                if (response.data.resultCode == 0){
                                                    props.unfollow(u.id)
                                                }
                                            });
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials: true, //мы должны быть залогиниными
                                            headers: {"API-KEY": "ea3d9034-c1d2-4af3-a252-178ff469f42f"}
                                        })
                                            .then(response => {
                                                if (response.data.resultCode == 0){
                                                    props.follow(u.id)
                                                }
                                            });
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