import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navbar} from "./Navbar";
import {SidebarType} from "../../redux/navbar-reducer";


type MapStatePropsType = {
    sidebar: Array<SidebarType>
}

export type NavbarPropsType = MapStatePropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        sidebar: state.navbarPage.sidebar
    }
}


export const NavbarContainer = connect(mapStateToProps)(Navbar);