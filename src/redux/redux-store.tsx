import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {ProfileReducer} from './profile-reducer';
import {NavbarReducer} from './navbar-reducer';
import {DialogsReducer} from './dialogs-reducer';
import {UsersReducer} from './users-reducer';
import {AuthReducer} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {AppReducer} from './app-reducer';

let rootReducer = combineReducers({
        profilePage: ProfileReducer,
        navbarPage: NavbarReducer,
        dialogsPage: DialogsReducer,
        usersPage: UsersReducer,
        auth: AuthReducer,
        form: formReducer,
        app: AppReducer
    })


declare global {
        interface Window {
                __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleware)))


export type AppStateType = ReturnType<typeof rootReducer>

(window as any).store = store;




