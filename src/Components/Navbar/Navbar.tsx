import React from 'react';
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";
import {NavbarPropsType} from "./NavbarContainer";
import {Sidebar} from "./Sidebar/Sidebar";


export const Navbar = (props: NavbarPropsType) => {
    return (
        <div className={s.navBarContainer}>
            <div className={s.navBarHeader}>
                <img
                    src={"https://pngimg.com/uploads/hedgehog/small/hedgehog_PNG18.png"}/>
                <h4> WILDchat</h4>
            </div>

            <nav className={s.nav}>
                <div className={s.menuLabel}>Menu</div>
                <div className={s.menuSide}>
                    <div className={s.item}>
                        <NavLink to={"/profile"} activeClassName={s.active}>Profile</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to={"/users"} activeClassName={s.active}>Users</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to={"/dialogs"} activeClassName={s.active}>Messages</NavLink>
                    </div>

                    <div className={s.item}>
                        <NavLink to={"/news"} activeClassName={s.active}>News</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to={"/music"} activeClassName={s.active}>Music</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to={"/settings"} activeClassName={s.active}>Settings</NavLink>
                    </div>

                </div>

            </nav>

            <div className={s.sidebar}>
                <div className={s.friends}> Friends</div>
                <div className={s.sidebarElements}>
                    {props.sidebar.map(sb => <Sidebar name={sb.name} avatar={sb.avatar} id={sb.id}/>)}
                </div>
            </div>
        </div>)
}
