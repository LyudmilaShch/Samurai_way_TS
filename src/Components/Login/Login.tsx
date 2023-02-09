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
import s from './Login.module.scss'
import imgForLogin from '../../assets/images/imgForLogin.jpg'

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

export const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormProps> & LoginFormProps> = ({
                                                                                                          handleSubmit,
                                                                                                          error,
                                                                                                          captchaUrl
                                                                                                      }) => {
    return (
        <form onSubmit={handleSubmit} className={s.loginForm}>
            <div >
                <p>Email Address</p>
                <Field placeholder={"Login"} name={"email"} component={Input} validate={[required]} className={s.field}/>
            </div>
            <div>
                <p>Your Password</p>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} className={s.field}
                       type={"password"}/>
            </div>
            <div className={s.rememberMe}>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} className={s.input}/>
                <p>Remember me</p>
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl &&
                <Field placeholder={"Symbols from image"} name={"captcha"} component={Input} validate={[required]}/>}
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>sign in</button>
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
    return <div className={s.loginPage}>
        <div className={s.loginSlider}>
            <div className={s.slider}>
                <img src={imgForLogin} className={s.sliderImg}/>
                <h3>Connect with the world</h3>
                <p>It is a long established fact that a reader will be distracted by the readable content.</p>
            </div>
        </div>
        <div className={s.loginPart}>
            <div className={s.loginFormContainer}>
                <h4>Login</h4>
                <p>Welcome to socialV, a platform to connect with the social world</p>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        </div>
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
    withRouter
)(Login)