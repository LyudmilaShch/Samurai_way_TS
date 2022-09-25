import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type DialogsType = {}

export const Dialogs = (props: DialogsType) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to ="/dialogs/1"> Rabbit</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ="/dialogs/2">  Leo</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ="/dialogs/3">  Mouse</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to ="/dialogs/4">  Wolf</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How is your IT</div>
                <div className={s.message}>Yo</div>
            </div>
        </div>
    )
}