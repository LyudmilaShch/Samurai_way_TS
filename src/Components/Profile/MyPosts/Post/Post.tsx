import React from 'react';
import s from './Post.module.scss';

type PostType = {
    message: string
    avatar?: string
    countlike: number
}

export const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img
                src={props.avatar}/>
            {props.message}
            <div>
                <span>like {props.countlike}</span>
            </div>
        </div>

    )
}