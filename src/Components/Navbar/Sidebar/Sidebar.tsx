import React from 'react';
import s from "../../Dialogs/Dialogs.module.scss";
import {SidebarType} from "../../../redux/navbar-reducer";


export const Sidebar = (props: SidebarType) => {

    return <div className={s.sidebarBlock}>
        <img
            src={props.avatar}/>
             {props.name}
    </div>

}

