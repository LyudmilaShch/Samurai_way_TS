import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {DialogItem} from "../Dialogs/DialogItem/DialogItem";
import {NavbarPageType} from "../../redux/store";
import {Sidebar} from "./Sidebar/Sidebar";

type NavbarType = {
    state: NavbarPageType
}


export const Navbar = (props: NavbarType) => {

    let SidebarElements =
        props.state.sidebar.map(sb => <Sidebar name={sb.name} avatar={sb.avatar} id={sb.id}/>)

    return (
        <div>
            <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink to={"/profile"} activeClassName={s.active}>Profile</NavLink>
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
            </nav>

            <div className={s.sidebar}>
               <div className={s.friends}> Friends </div>
                <div className={s.sidebarElements}>
                    {SidebarElements}
                </div>
            </div>
        </div>
    )
}