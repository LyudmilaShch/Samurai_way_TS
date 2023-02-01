import React from 'react';
import styles from './FormsControls.module.css'

// @ts-ignore
const FormControl = ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

// @ts-ignore
export const Textarea = (props: any) => {
    // @ts-ignore
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

// @ts-ignore
export const Input = (props: any) => {
    // @ts-ignore
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
