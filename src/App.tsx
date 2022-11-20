import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import UsersContainer from './Components/users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileContainer";


function App() {

    //const state = props.store.getState()
    // @ts-ignore
    return (
        <div className="app-wrapper">
            <Header/>
            <NavbarContainer />
            <div className="app-wrapper-content">
                <Route path={"/profile"}
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
                <Route path={"/Music"} render={() => <Music/>}/>
                <Route path={"/Settings"} render={() => <Settings/>}/>
            </div>
        </div>
    );
}

export default App;
