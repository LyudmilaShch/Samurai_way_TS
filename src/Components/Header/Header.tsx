import React from 'react';
import s from './Header.module.css';

export const Header = () => {
    return (
        <header className={s.header}>
                <img
                    src={"https://pngimg.com/uploads/hedgehog/small/hedgehog_PNG18.png"}/>
            <div className={s.title}> WILDchat</div>

        </header>
    )}
