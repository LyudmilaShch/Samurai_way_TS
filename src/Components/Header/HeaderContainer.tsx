import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {loginOut, setAuthUserData, setAuthUserPhoto} from "../../redux/auth-reducer";
import {ProfileType} from "../../redux/profile-reducer";



type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
    photo: string | null,
    profile: ProfileType

}
type MapDispatchPropsType = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => void
    setAuthUserPhoto: (photo: string) => void
    loginOut: () => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType, any> {

    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth} photo={this.props.photo} loginOut={this.props.loginOut} profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.data.login,
        isAuth: state.auth.data.isAuth,
        photo: state.auth.photo,
        profile: state.profilePage.profile,
    }
};

export default connect(mapStateToProps, {setAuthUserData, setAuthUserPhoto, loginOut})(HeaderContainer);