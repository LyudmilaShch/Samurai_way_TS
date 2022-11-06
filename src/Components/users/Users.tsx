import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import s from './Users.module.css';

export let Users = (props: UsersPropsType) => {

    if (props.users.length === 0){
        props.setUsers([
            {
                id: 1,
                followed: false,
                fullName: "Fox",
                avatar: "https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg",
                status: 'Do what you love',
                location: {
                    city: 'Minsk',
                    country: 'Belarus'
                }
            },
            {
                id: 2,
                followed: true,
                fullName: "Squirrel",
                avatar: "http://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg",
                status: 'never look back',
                location: {
                    city: 'Saint-peterburg',
                    country: 'Russia'
                }
            },
            {
                id: 3,
                followed: true,
                fullName: "Leo",
                avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
                status: 'The king, just the king',
                location: {
                    city: 'Krasnoyarsk',
                    country: 'Russia'
                }
            },
            {
                id: 4,
                followed: false,
                fullName: "Deer",
                avatar: "https://www.kalashnikov.ru/wp-content/uploads/2021/04/natsionalnyi-park-ssha-priroda-1024x1024.jpg",
                status: 'I am deer',
                location: {
                    city: 'Moscow',
                    country: 'Russia'
                }
            },
        ])
    }


    return <div>
        {
            props.users.map(u =>
                <div key={u.id}>
                <span>
                    <div>
                        <img src={u.avatar}  className={s.userAvatar}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {props.follow(u.id)}}>Follow</button> }

                    </div>
                </span>
                    <span>
                    <span>
                        <div>
                            {u.fullName}
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {u.location.country}
                        </div>
                        <div>
                            {u.location.city}
                        </div>
                    </span>
                </span>
                </div>
            )
        }
    </div>
}