import React from 'react';
import './index.css';
import {RootStateType, state, subscribe} from "./redux/State";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, sendMessage, updateMessageText, updateNewPostText} from './redux/State';
import {BrowserRouter} from "react-router-dom";


const renderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} updateMessageText={updateMessageText} sendMessage={sendMessage}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}



renderEntireTree();
subscribe(renderEntireTree);