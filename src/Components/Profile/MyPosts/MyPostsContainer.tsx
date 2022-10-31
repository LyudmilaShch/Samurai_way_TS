import React, {ChangeEvent} from 'react';
import {PostsType, StoreType} from "../../../redux/store";
import {addPostCreator, UpdateNewPostTextCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";


type MyPostsContainerType = {
    //store: StoreType
}


export const MyPostsContainer = (props: MyPostsContainerType) => {
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState()
                const onAddPost = () => {
                    store.dispatch(addPostCreator(state.profilePage.newPostText));
                }
                const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch(UpdateNewPostTextCreator(e.currentTarget.value));
                }
                return <MyPosts
                    addPost={onAddPost}
                    updateNewPostText={onPostChange}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                />
            }}
        </StoreContext.Consumer>
    )
}