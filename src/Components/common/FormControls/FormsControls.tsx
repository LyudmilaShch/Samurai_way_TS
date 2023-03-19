import React, {ComponentType} from 'react';
import styles from './FormsControls.module.scss'
import {Field, WrappedFieldProps} from "redux-form";
import s from "../../Login/Login.module.scss";
import {FieldValidatorType} from "../../../utils/validators/validators";
import {WrappedFieldMetaProps} from "redux-form/lib/Field"


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;

    return <FormControl  {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;

    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export function createField<KeysType extends string>(placeholder: string | null,
   name: KeysType,
   validators: Array<FieldValidatorType>,
   component: "input" | "select" | "textarea" | ComponentType<WrappedFieldProps> | undefined,
   props: {}, text = "", pText: string | null)
{
    return (
        <div>
            <p>{pText}</p>
            <Field placeholder={placeholder} name={name} component={component} validate={validators}
                   {...props}/>
            {text}
        </div>
    )
}