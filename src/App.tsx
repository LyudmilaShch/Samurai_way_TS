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

type AppType = {
    posts: PostsType[],
    dialogs: DialogType[],
    messages: MessagesType[]
}

type PostsType = {
    id: number,
    message: string,
    avatar: string,
    countlike: number
}
type DialogType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}

function App(props: AppType) {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path={"/profile"} render={() => <Profile posts={props.posts}/>}/>
                    <Route path={"/dialogs"}
                           render={() => <Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                    <Route path={"/News"} render={() => <News/>}/>
                    <Route path={"/Music"} render={() => <Music/>}/>
                    <Route path={"/Settings"} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
