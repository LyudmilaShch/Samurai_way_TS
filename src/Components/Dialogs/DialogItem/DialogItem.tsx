import React from 'react';
import s from '../Dialogs.module.scss';
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string,
    avatar: string
    id: number
}

export const DialogItem = (props: DialogItemType) => {
    let path = "/dialogs/" + props.id;

    return <div className={s.dialog + ' ' + s.active}>
        <div className={s.names}>
            <img
                src={props.avatar}/>
            <div className={s.dialogName}>
                <NavLink to={path} className="inactive" activeClassName="active" exact={true}>{props.name}</NavLink>
            </div>
        </div>
    </div>
}

