import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormControls/FormsControls";
import s from '../ProfileInfo.module.scss';
import styles from "../../../common/FormControls/FormsControls.module.scss";
import {ProfileType} from "../../../../types/types";

interface ProfileDataFormProps {
    profile: ProfileType
}

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormProps> & ProfileDataFormProps> = ({
                                                                                                                           handleSubmit,
                                                                                                                           error,
                                                                                                                           profile
                                                                                                                       }) => {
    return (
        <form>
            <div className={s.block}>
                <h5>Personal information</h5>
            </div>
            <div className={s.block}>
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <div className={s.nameDescription}>Full name</div>
                    <Field placeholder={'Full name'} name={'fullName'} component={Input} className={s.field}/>
                </div>
                <div>
                    <div className={s.nameDescription}>About me</div>
                    <Field placeholder={'About me'} name={'aboutMe'} component={Textarea} className={s.field}/>
                </div>
                <div>
                    <div className={s.nameDescription}>Looking for a job</div>
                    <Field placeholder={''} name={'lookingForAJob'} component={Input}
                           type={"checkbox"} className={s.field}/>
                </div>
                <div>
                    <div className={s.nameDescription}>My professional skills</div>
                    <Field placeholder={'My professional skills'} name={'lookingForAJobDescription'}
                           component={Textarea} className={s.field}/>
                </div>
            </div>
            <div>
                <div className={s.block}>
                    <h5>Contacts</h5>
                </div>
                <div className={s.block}>
                    {Object.keys(profile.contacts).map(key => {
                        return <div className={s.contact}>
                            <div className={s.nameDescription}>{key}:</div>
                            <Field placeholder={key} name={"contacts." + key} component={Input} className={s.field}/>
                        </div>
                    })}
                    <div>
                        <button onClick={handleSubmit}>save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormProps>({
    // a unique name for the form
    form: 'edit-profile'
})(ProfileDataForm)