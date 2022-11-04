import React, {ChangeEvent} from 'react';
import {addPostCreator, InitialStateType, PostsType, UpdateNewPostTextCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


type MyPostsContainerType = {
    //store: StoreType
}


// export const MyPostsContainer = (props: MyPostsContainerType) => {
//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState()
//                 const onAddPost = () => {
//                     store.dispatch(addPostCreator(state.profilePage.newPostText));
//                 }
//                 const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//                     store.dispatch(UpdateNewPostTextCreator(e.currentTarget.value));
//                 }
//                 return <MyPosts
//                     addPost={onAddPost}
//                     updateNewPostText={onPostChange}
//                     posts={state.profilePage.posts}
//                     newPostText={state.profilePage.newPostText}
//                 />
//             }}
//         </StoreContext.Consumer>
//     )
// }
type MapStatePropsType = {
    posts:  Array<PostsType>,
    newPostText: string
}
type MapDispatchPropsType = {
    addPost: () => void
    updateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export type PostsPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {

    return {
        addPost: () => {
            dispatch(addPostCreator());
        },
        updateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(UpdateNewPostTextCreator(e.currentTarget.value));
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)