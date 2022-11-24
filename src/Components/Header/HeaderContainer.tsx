import React from 'react';
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData, setAuthUserPhoto} from "../../redux/auth-reducer";


type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
    photo: string | null
}
type MapDispatchPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
    setAuthUserPhoto: (photo: string) => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType, any> {
    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + id)
                        .then(response => {
                            this.props.setAuthUserPhoto(response.data.photos.large)
                        });
                }
            })
    }


    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth} photo={this.props.photo}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.data.login,
        isAuth: state.auth.isAuth,
        photo: state.auth.photo
    }
};

export default connect(mapStateToProps, {setAuthUserData, setAuthUserPhoto})(HeaderContainer);