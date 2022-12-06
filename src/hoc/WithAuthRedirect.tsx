import {Redirect} from "react-router-dom";
import React, {Component, ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const AuthRedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        console.log(isAuth)
        if (!isAuth) return <Redirect to={"/Login"}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedRedirectComponent = connect(mapStateToProps)(AuthRedirectComponent)

    return ConnectedRedirectComponent
}