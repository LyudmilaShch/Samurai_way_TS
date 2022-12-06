import React, {useState} from 'react';
import s from './ProfileInfo.module.css';


type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType, any> {
    state = {
        editMode: false
    }
    activateEditMode () {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode () {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
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