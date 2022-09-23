import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (
        <div>
            <textarea></textarea>
            <button>Add post</button>
            <div className={s.posts}>
                <Post message={"Fur-fur-fur"} avatar={"https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg"} countlike={5}/>
                <Post message={"Keooo-keooo"} avatar={"http://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg"} countlike={7}/>
                <Post message={"R-r-r-r-r-r"} avatar={"https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"} countlike={15}/>
                <Post message={"I am deer"} avatar={"https://www.kalashnikov.ru/wp-content/uploads/2021/04/natsionalnyi-park-ssha-priroda-1024x1024.jpg"} countlike={12}/>
            </div>
        </div>
    )
}