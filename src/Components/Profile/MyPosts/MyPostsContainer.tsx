import React, {ChangeEvent} from 'react';
import {addPostCreator, InitialStateType, PostsType} from "../../../redux/profile-reducer";
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
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

export type PostsPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {

    return {
        addPost: (newPostText: string) => {
            dispatch(addPostCreator(newPostText));
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)