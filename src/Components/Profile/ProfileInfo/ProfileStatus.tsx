import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';


type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
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
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
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


// const ProfileStatus = (props: ProfileStatusType) => {
//     const [editMode, setEditMode] = useState<boolean>(false)
//     const [status, setStatus] = useState<string>(props.status)
//     const activateEditMode = () => {
//         setEditMode(true)
//     }
//
//     const deactivateEditMode = () => {
//         setEditMode(false)
//         // props.updateStatus(status);
//     }
//
//     const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//
//         setStatus(e.currentTarget.value);
//     }
//
//     return (
//         <div>
//             {!editMode &&
//                 <div>
//                     <span onDoubleClick={activateEditMode}>{status}</span>
//                 </div>
//             }
//             {editMode &&
//                 <div>
//                     <input autoFocus={true} value={status} onBlur={deactivateEditMode} onChange={onStatusChange}/>
//                 </div>
//             }
//         </div>
//     )
// }
export default ProfileStatus