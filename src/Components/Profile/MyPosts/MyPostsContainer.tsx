import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import { PostsType } from '../../../types/types';

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
            dispatch(actions.addPostCreator(newPostText));
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)