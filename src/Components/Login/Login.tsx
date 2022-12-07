import React from 'react';
import s from './Login.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {authorization, setLogin} from "../../redux/login-reducer";
import {AppStateType} from "../../redux/redux-store";
import {authorizationModelType} from "../../api/api";
import {Profile} from "../Profile/Profile";


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
type MapStatePropsType = {
    email: string,
    password: string,
    rememberMe: boolean
}
type MapDispatchPropsType = {
    authorization: (authorizationModel: FormDataType) => void
}
export type LoginPropsType = MapStatePropsType & MapDispatchPropsType

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component="input" />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component="input"/>
            </div>
            <div>
                <Field  component="input" name={"rememberMe"} type={"checkbox"}/>remember me
            </div>
            <div>
                <button>login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<FormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)



export const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) =>{
        // console.log(formData)
        props.authorization(formData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        email: state.login.email,
        password: state.login.password,
        rememberMe: state.login.rememberMe

    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {authorization}),
    withRouter,
)(Login)