import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";
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
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
export type AppPropsType = MapStatePropsType & MapDispatchPropsType


class App extends React.Component<AppPropsType, any> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<div><Preloader/></div>}>
                        <section>
                            <Route path={"/profile/:userId?"} render={() => <ProfileContainer/>}/>
                            <Route path={"/users"} render={() => <UsersContainer/>}/>
                            <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
                            <Route path={"/News"} render={() => <News/>}/>
                            <Route path={"/Music"} render={() => <Music/>}/>
                            <Route path={"/Settings"} render={() => <Settings/>}/>
                            <Route path={"/Login"} render={() => <Login/>}/>
                        </section>
                    </Suspense>
                </div>
            </div>
        );
    }
}

// export default App;
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized
    }
};
let AppContainer = compose
    < React.ComponentType > (
        withRouter,
            connect(mapStateToProps, {initializeApp}))(App);

let SamuraiJsApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}
export default SamuraiJsApp