import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';


type ProfileStatusType = {
    status: string
    updateStatus: any
}

class ProfileStatus extends React.Component<ProfileStatusType, any> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        debugger
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        this.setState({
            status: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "------"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}
                               onChange={this.onStatusChange}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus

// export const ProfileStatus = (props: ProfileStatusType) => {
//     const [editMode, setEditMode] = useState<boolean>(false)
//     const changeStatusHandler = () => {
//         setEditMode(true)
//     }
//
//
//     return (
//         <div>
//             <div>
//                 <span onClick={changeStatusHandler}>{props.status}</span>
//             </div>
//             <div>
//                 <input value={props.status} disabled={!editMode}/>
//             </div>
//         </div>
//     )
// }