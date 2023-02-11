import React from 'react';
import s from './MyPosts.module.scss';
import {Post} from "./Post/Post";
import {PostsPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormsControls";

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

const AddPostForm: React.FC<InjectedFormProps<PostDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={"newPostText"}
                       placeholder={"Enter your post"}
                       className={s.addPostArea}
                       validate={[required, maxLength10]}/>
                <div className={s.buttonContainer}>
                    <button className={s.addPostButton}>Add post</button>
                </div>

            </div>
        </form>
    )

}

const AddPostFormRedux = reduxForm<PostDataType>({form: "AddPostForm"})(AddPostForm);