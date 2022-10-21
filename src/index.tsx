import React from 'react';
import './index.css';
import {store} from "./redux/State";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";


const renderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={store.getState()}
                addPost={store.addPost.bind(store)}
                updateNewPostText={store.updateNewPostText.bind(store)}
                updateMessageText={store.updateMessageText.bind(store)}
                sendMessage={store.sendMessage.bind(store)}
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
}


renderEntireTree();
store.subscribe(renderEntireTree);