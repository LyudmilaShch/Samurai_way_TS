import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/State";


type NewPostsType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: any) => void,
}


export const MyPosts = (props: NewPostsType) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message}
                                   avatar={p.avatar}
                                   countlike={p.countlike}
        />)

    const addPost = () => {
            props.dispatch({type: 'ADD-POST', newPostText: props.newPostText});
        }


    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
     props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: e.currentTarget.value});
        }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea className={s.addPostArea} value={props.newPostText} onChange={onPostChange}/>
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