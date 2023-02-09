import React from 'react';
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {AuthType} from "../../redux/auth-reducer";
import userPhoto from "../../assets/images/user.png";
import { ReactComponent as Logout } from "../../assets/images/logout.svg";

export const Header = (props: AuthType) => {
    return (
        <header className={s.header}>
            {/*<img*/}
            {/*    src={"https://pngimg.com/uploads/hedgehog/small/hedgehog_PNG18.png"}/>*/}
            {/*<div className={s.title}> WILDchat</div>*/}
            <div>
                {props.isAuth
                    ? <div className={s.loginBlock}>
                        <p>{props.login}</p>
                        <img src={props.profile?.photos.large !== null ? props.profile?.photos.large : userPhoto}
                             className={s.userAvatar}/>
                        <button onClick={props.loginOut}><Logout className={s.logout}/></button>
                    </div>
                    : <NavLink to={'/login'}>Logout</NavLink>
                }
            </div>

        </header>
    )
}
