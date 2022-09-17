import React from 'react';
import s from './Navbar.module.css';
console.log(s);

/*let s = {
    'nav': 'Navbar_nav__8x2WV',
    'item': 'Navbar_item__FNBjC',
    'active': 'Navbar_active__RUzP9'


}*/

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <a>Profile</a>
            </div>
            <div className={s.item}>
                <a>Messages</a>
            </div>
            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
        </nav>
    )
}