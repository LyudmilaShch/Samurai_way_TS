import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/State";


type NewPostsType = {
    posts: Array<PostsType>
    addPost: (postMessage: string) => void
}

export const MyPosts = (props: NewPostsType) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message}
                                   avatar={p.avatar}
                                   countlike={p.countlike}
        />)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {

        if (newPostElement.current) {
            props.addPost(newPostElement.current.value);
            newPostElement.current.value = " ";
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} className={s.addPostArea}></textarea>
                </div>
                <div>
                    <button onClick={addPost} className={s.addPostButton}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}