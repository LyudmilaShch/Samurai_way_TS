import React from 'react'
import {UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>,
    toggleInFollowingInProgress: (isFetching: boolean, userId: number) => void
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}


export let Users = ({
                        totalUsersCount,
                        pageSize,
                        currentPage,
                        onPageChanged,
                        users,
                        follow,
                        unfollow,
                        followingInProgress,
                        ...props
                    }: UsersPropsType) => {

    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged} portionSize={10}/>
        <div>
            {
                users.map(u =>
                    <User user={u} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow}/>
                )
            }
        </div>
    </div>
}