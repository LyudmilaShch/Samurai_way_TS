import React from 'react';
import s from '../Dialogs.module.scss';

type MessageType = {
    avatar: string,
    message: string,
    name: string
}

export const Message = (props: MessageType) => {
    let locationBlockMessage;
    let locationMessage;
    let locationAngle;
    if (props.name === "Leo") {
        locationMessage = s.messageRight;
        locationAngle = s.angleRight;
        locationBlockMessage = s.blockMessageRight;
    } else {
        locationMessage = s.message;
        locationAngle = s.angle;
        locationBlockMessage = s.blockMessage;
    }
    return (
        <div className={locationMessage}>
            <img src={props.avatar} alt="Avatar"></img>
            <div className={locationAngle}/>
            <div className={locationBlockMessage}>
                {/*<div className={s.name}>{props.name}</div>*/}
                <div className={s.text}>{props.message}</div>
            </div>
        </div>)
}

