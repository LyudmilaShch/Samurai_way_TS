import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login: string | null,
    isAuth: boolean
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src={"https://pngimg.com/uploads/hedgehog/small/hedgehog_PNG18.png"}/>
            <div className={s.title}> WILDchat</div>

            <div className={s.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>

        </header>
    )
}
