import React from 'react';
import s from './ProfileInfo.module.css';


export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={s.img_forest}
                     src='https://abrakadabra.fun/uploads/posts/2022-01/1643659835_9-abrakadabra-fun-p-dlinnii-fon-lesa-17.jpg'/>
            </div>
            <div className={s.descriptionblock}>
                ava + description
            </div>

        </div>
    )
}