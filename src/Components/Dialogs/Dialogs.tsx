import React from 'react';
import s from './Dialogs.module.css'

type DialogsType = {

}

export const Dialogs = (props: DialogsType) => {
    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
               <div className={s.dialog}>
                   Rabbit
               </div>
               <div className={s.dialog}>
                   Leo
               </div>
               <div className={s.dialog}>
                   Mouse
               </div>
               <div className={s.dialog}>
                   Wolf
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