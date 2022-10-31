import React, {ChangeEvent} from 'react';
import {PostsType, StoreType} from "../../../redux/store";
import {addPostCreator, UpdateNewPostTextCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";


type MyPostsContainerType = {
    store: StoreType
}


export const MyPostsContainer = (props: MyPostsContainerType) => {
let state = props.store.getState()
    const onAddPost = () => {
        props.store.dispatch(addPostCreator(state.profilePage.newPostText));
    }


    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch(UpdateNewPostTextCreator(e.currentTarget.value));
    }

    return (
        <MyPosts
            addPost={onAddPost}
            updateNewPostText={onPostChange}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
        />
    )
}