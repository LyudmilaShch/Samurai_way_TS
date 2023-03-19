import React from 'react';
import s from './MyPosts.module.scss';
import {Post} from "./Post/Post";
import {PostsPropsType} from "./MyPostsContainer";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Textarea} from "../../common/FormControls/FormsControls";

type PostDataType = {
    newPostText: string
}

export const MyPosts = React.memo((props: PostsPropsType) => {
    let postsElements =
        props.posts.map(p => <Post
            key={p.id} message={p.message}
            avatar={p.avatar}
            countlike={p.countlike}
        />)

    let addNewPost = (values: PostDataType) => {
        props.addPost(values.newPostText);
    }


    return (
        <div>
            <div   className={s.postsBlock}>
                <h5>My Posts</h5>
                <div>
                    <AddPostFormRedux onSubmit={addNewPost}/>
                </div>
            </div>
            <div >
                <div>
                    {postsElements}
                </div>
            </div>
        </div>

    )
})

const maxLength10 = maxLengthCreator(10)
type NewPostFormValuesKeysTypes = Extract<keyof PostDataType, string>
const AddPostForm: React.FC<InjectedFormProps<PostDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewPostFormValuesKeysTypes>("Enter your post", "newPostText",
                    [required, maxLength10], Textarea, {className: s.addPostArea}, "", null)}
                <div className={s.buttonContainer}>
                    <button className={s.addPostButton}>Add post</button>
                </div>

            </div>
        </form>
    )

}

const AddPostFormRedux = reduxForm<PostDataType>({form: "AddPostForm"})(AddPostForm);