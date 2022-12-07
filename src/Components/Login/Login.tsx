import React from 'react';
import s from './Login.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}


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
export const Login = () => {
    const onSubmit = (formData: FormDataType) =>{
        console.log(formData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}