import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";


type NewPostsType = {
    posts: PostsType[],
}
type PostsType = {
    id: number,
    message: string,
    avatar: string,
    countlike: number
}

export const MyPosts = (props: NewPostsType) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message}
                        avatar={p.avatar}
                        countlike={p.countlike}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}