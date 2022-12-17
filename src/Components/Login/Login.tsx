import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {authorization} from "../../redux/login-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Input} from "../common/FormControls/FormsControls";
import {required} from "../../utils/validators/validators";


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
                <Field placeholder={"Login"} name={"login"} component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field  component={Input} name={"rememberMe"} type={"checkbox"}/>remember me
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