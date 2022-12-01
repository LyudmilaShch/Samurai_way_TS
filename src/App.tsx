import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import UsersContainer from './Components/users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";


function App() {

    //const state = props.store.getState()
    // @ts-ignore
    return (
        <div className="app-wrapper">

            <HeaderContainer />
            <NavbarContainer />
            <div className="app-wrapper-content">
                <Route path={"/profile/:userId?"}
                       render={() => <ProfileContainer
                           //store={props.store}
                       />}/>
                <Route path={"/users"}
                       render={() => <UsersContainer />}/>
                <Route path={"/dialogs"}
                       render={() => <DialogsContainer
                           //store={props.store}
                       />}/>
                <Route path={"/News"} render={() => <News/>}/>
                <Route path={"/Login"} render={() => <Music/>}/>
                <Route path={"/Settings"} render={() => <Settings/>}/>
                <Route path={"/Login"} render={() => <Login/>}/>
            </div>
        </div>
    );
}

export default App;
