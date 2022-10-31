import React from 'react';
import './index.css';
import {store} from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {RootStateType} from "./redux/store";
import {Provider} from "./StoreContext";





const renderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App
                //store={store}
/*              state={store.getState()}
                dispatch={store.dispatch.bind(store)}
                updateMessageText={store.updateMessageText.bind(store)}
                sendMessage={store.sendMessage.bind(store)}*/
            />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


renderEntireTree(store.getState());
store.subscribe(() => {
    let state = store.getState();
    renderEntireTree(state);
});