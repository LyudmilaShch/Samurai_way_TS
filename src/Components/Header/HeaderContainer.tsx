import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthMe, loginOut, setAuthUserData, setAuthUserPhoto} from "../../redux/auth-reducer";



type MapStatePropsType = {
    login: string | null,
    isAuth: boolean,
    photo: string | null
}
type MapDispatchPropsType = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => void
    setAuthUserPhoto: (photo: string) => void
    getAuthMe: () => void
    loginOut: () => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType, any> {
    componentDidMount() {
        this.props.getAuthMe()
    }


    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth} photo={this.props.photo} loginOut={this.props.loginOut}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.data.login,
        isAuth: state.auth.data.isAuth,
        photo: state.auth.photo
    }
};

export default connect(mapStateToProps, {setAuthUserData, setAuthUserPhoto, getAuthMe, loginOut})(HeaderContainer);