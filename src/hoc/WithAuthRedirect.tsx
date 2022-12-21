import {Redirect} from "react-router-dom";
import React, {Component, ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.data.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const AuthRedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/Login"}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(AuthRedirectComponent)

    return ConnectedRedirectComponent
}