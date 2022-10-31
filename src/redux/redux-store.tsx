import {combineReducers, createStore} from "redux";
import {ProfileReducer} from "./profile-reducer";
import {NavbarReducer} from "./navbar-reducer";
import {DialogsReducer} from "./dialogs-reducer";


let reducers = combineReducers({
    profilePage: ProfileReducer,
    navbarPage: NavbarReducer,
    dialogsPage: DialogsReducer

})

export let store = createStore(reducers);

