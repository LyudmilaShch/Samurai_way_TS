import React from 'react';
import s from './Post.module.css';

export const Post = () => {
    return (
        <div className={s.item}>
            <img
                src={'https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg'}/>
            post 1
            <div>
                <span>like</span>
            </div>

        </div>

    )
}