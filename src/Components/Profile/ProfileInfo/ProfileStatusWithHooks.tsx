import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.scss';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    };


    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div className={s.status}>
                    <span onDoubleClick={activateEditMode}>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} value={status} onBlur={deactivateEditMode} onChange={onStatusChange}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks