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


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    authorization: (authorizationModel: FormDataType) => void
    loginOut: () => void
}
export type LoginPropsType = MapStatePropsType & MapDispatchPropsType

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"email"} component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"}/>
            </div>
            <div>
                <Field  component={Input} name={"rememberMe"} type={"checkbox"}/>remember me
            </div>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
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



const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) =>{
        props.authorization(formData)
    }
    console.log(props.isAuth)
    if (props.isAuth){
        return  <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.data.isAuth
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {authorization, loginOut}),
    withRouter,
)(Login)