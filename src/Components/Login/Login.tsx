import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {Input} from "../common/FormControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {authorization, loginOut} from "../../redux/auth-reducer";
import styles from '../common/FormControls/FormsControls.module.css'
import {ProfileType} from "../../redux/profile-reducer";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

interface LoginFormProps {
    captchaUrl: string | null
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    authorization: (authorizationModel: FormDataType) => void
    loginOut: () => void
}
export type LoginPropsType = MapStatePropsType & MapDispatchPropsType

export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormProps> & LoginFormProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"email"} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]}
                       type={"password"}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/>remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field placeholder={"Symbols from image"} name={"captcha"} component={Input} validate={[required]}/>}
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<FormDataType, LoginFormProps>({
    // a unique name for the form
    form: 'login'
})(LoginForm)


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.authorization(formData)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.data.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {authorization, loginOut}),
    withRouter,
)(Login)