import React from 'react'
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import s from './Users.module.scss'
import {UsersType} from '../../types/types';

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

export let Users: React.FC<UsersPropsType> = ({
                        totalUsersCount,
                        pageSize,
                        currentPage,
                        onPageChanged,
                        users,
                        follow,
                        unfollow,
                        followingInProgress
                    }) => {

    return <div className={s.usersContainer}>
        <div className={s.usersBlock}>
            {
                users.map(u =>
                    <User user={u} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow}/>
                )
            }
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged} portionSize={10}/>
        </div>
    </div>
}