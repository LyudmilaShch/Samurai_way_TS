import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";

export const MyPosts = () => {

    let PostsData = [
        {
            id: 1,
            message: "Fur-fur-fur",
            avatar: "https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg",
            countlike: 5
        },
        {
            id: 2,
            message: "Keooo-keooo",
            avatar: "http://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg",
            countlike: 7
        },
        {
            id: 3,
            message: "R-r-r-r-r-r",
            avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            countlike: 15
        },
        {
            id: 4,
            message: "I am deer",
            avatar: "https://www.kalashnikov.ru/wp-content/uploads/2021/04/natsionalnyi-park-ssha-priroda-1024x1024.jpg",
            countlike: 12
        },

    ]

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message={PostsData[0].message}
                      avatar={PostsData[0].avatar}
                      countlike={PostsData[0].countlike}/>
                <Post message={PostsData[1].message}
                      avatar={PostsData[1].avatar}
                      countlike={PostsData[1].countlike}/>
                <Post message={PostsData[2].message}
                      avatar={PostsData[2].avatar}
                      countlike={PostsData[2].countlike}/>
                <Post message={PostsData[3].message}
                      avatar={PostsData[3].avatar}
                      countlike={PostsData[3].countlike}/>
            </div>
        </div>
    )
}