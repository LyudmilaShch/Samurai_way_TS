import {ProfileType} from "../../../../redux/profile-reducer";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormControls/FormsControls";
import s from '../ProfileInfo.module.css';
import styles from "../../../common/FormControls/FormsControls.module.css";

interface ProfileDataFormProps {
    profile: ProfileType
}

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormProps> & ProfileDataFormProps> = ({handleSubmit, error, profile}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Name: </b><Field placeholder={'Full name'} name={'fullName'} component={Input}/>
            </div>
            <div>
                <b>About me: </b><Field placeholder={'About me'} name={'aboutMe'} component={Textarea}/>
            </div>
            <div>
                <b>Looking for a job: </b><Field placeholder={''} name={'lookingForAJob'} component={Input}
                                                 type={"checkbox"}/>
            </div>
            <div>
                <b>My professional skills: </b><Field placeholder={'My professional skills'} name={'lookingForAJobDescription'} component={Textarea}/>
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <div className={s.contact}>
                    <b> {key}: </b><Field placeholder={key} name={"contacts." + key} component={Input}/>
                </div>

            })}
            </div>
        </form>
    )
}

export const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormProps>({
    // a unique name for the form
    form: 'edit-profile'
})(ProfileDataForm)