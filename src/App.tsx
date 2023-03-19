import React, {Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import UsersContainer from './Components/users/UsersContainer';
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from './Components/Login/Login';
import {connect, Provider} from "react-redux";
import {AppStateType, store} from "./redux/redux-store";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./Components/common/preloader/Preloader";

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

type MapStatePropsType = {
    isAuth: boolean
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
export type AppPropsType = MapStatePropsType & MapDispatchPropsType


class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = () => {
        alert("Some error occured")
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <>{this.props.isAuth
                ? <div className="app-wrapper">
                    <HeaderContainer/>
                    <NavbarContainer/>
                    <div className="app-wrapper-content">
                        <Suspense fallback={<div><Preloader/></div>}>
                            <Switch>
                                <Route exact path={"/"} render={() => <Redirect to="/profile" />}/>
                                <Route exact path={"/login"} render={() => <Redirect to="/profile" />}/>
                                <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                                <Route path={"/users"} render={() => <UsersContainer/>}/>
                                <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
                                <Route path={"/News"} render={() => <News/>}/>
                                <Route path={"/Music"} render={() => <Music/>}/>
                                <Route path={"/Settings"} render={() => <Settings/>}/>

                                <Route path={"*"} render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Suspense>
                    </div>
                </div>
                : <div>
                    <Route path={"*"} render={() => <Redirect to="/login" />}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </div>
            }
            </>
    );
    }
    }

    const mapStateToProps = (state: AppStateType): MapStatePropsType => {
        return {
            isAuth: state.auth.data.isAuth,
            initialized: state.app.initialized
        }
    };
    let AppContainer = compose
        < React.ComponentType> (
            withRouter,
            connect(mapStateToProps, {initializeApp}))(App);

            let SamuraiJsApp = () => {
                return (
                <BrowserRouter>
                <Provider store={store}>
                <AppContainer/>
                </Provider>
                </BrowserRouter>
                )
            }
            export default SamuraiJsApp