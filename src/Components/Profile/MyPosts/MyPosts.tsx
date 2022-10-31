import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/store";


type NewPostsType = {
    addPost: () => void
    updateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => void
    posts: Array<PostsType>
    newPostText: string
}


export const MyPosts = (props: NewPostsType) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message}
                                   avatar={p.avatar}
                                   countlike={p.countlike}
        />)

    const addPost = () => {
        props.addPost();
           // props.dispatch(addPostCreator(props.newPostText));
        }


    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
       props.updateNewPostText(e)
     //props.dispatch(UpdateNewPostTextCreator(e.currentTarget.value));
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