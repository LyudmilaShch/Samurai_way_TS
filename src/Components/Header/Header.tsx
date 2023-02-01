import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {AuthType} from "../../redux/auth-reducer";
import userPhoto from "../../assets/images/user.png";

export const Header = (props: AuthType) => {
    return (
        <header className={s.header}>
            <img
                src={"https://pngimg.com/uploads/hedgehog/small/hedgehog_PNG18.png"}/>
            <div className={s.title}> WILDchat</div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>
                        <img src={props.profile?.photos.large !== null ? props.profile?.photos.large : userPhoto}
                             className={s.userAvatar}/>
                        {props.login}
                        <button onClick={props.loginOut}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>

        </header>
    )
}
