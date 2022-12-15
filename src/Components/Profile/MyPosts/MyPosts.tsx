import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {PostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type PostDataType = {
    newPostText: string
}

export const MyPosts = (props: PostsPropsType) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message}
                                   avatar={p.avatar}
                                   countlike={p.countlike}
        />)

    let addNewPost = (values: PostDataType) => {
        props.addPost(values.newPostText) ;
    }



    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
               <AddPostFormRedux onSubmit={addNewPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const AddPostForm: React.FC<InjectedFormProps<PostDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"}
                       name={"newPostText"}
                       placeholder={"Enter your post"}
                       className={s.addPostArea}/>

                <button className={s.addPostButton}>Add post</button>
            </div>
        </form>
        )

}

const AddPostFormRedux = reduxForm<PostDataType>({form: "AddPostForm"})(AddPostForm);