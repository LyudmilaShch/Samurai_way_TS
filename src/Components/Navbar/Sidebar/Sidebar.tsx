import React from 'react';
import s from "../../Dialogs/Dialogs.module.css";


type SidebarType = {
    name: string,
    avatar: string
    id: number
}

export const Sidebar = (props: SidebarType) => {

    return <div  className={s.sidebarBlock}>
        <img
            src={props.avatar}/>
        {props.name}
        </div>

}

