import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {RootStateType, StoreType} from './redux/State';

type appStoreType = {
    store: StoreType
}

function App(props: appStoreType) {
    const state = props.store.getState()
    // @ts-ignore
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar state={state.navbarPage}/>
            <div className="app-wrapper-content">
                <Route path={"/profile"}
                       render={() => <Profile
                           profilePage={state.profilePage}
                           dispatch={props.store.dispatch.bind(props.store)}
                       />}/>
                <Route path={"/dialogs"}
                       render={() => <Dialogs
                           state={state.dialogsPage}
                           dispatch={props.store.dispatch.bind(props.store)}
                       />}/>
                <Route path={"/News"} render={() => <News/>}/>
                <Route path={"/Music"} render={() => <Music/>}/>
                <Route path={"/Settings"} render={() => <Settings/>}/>
            </div>
        </div>
    );
}

export default App;
