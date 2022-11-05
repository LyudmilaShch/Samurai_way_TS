import {combineReducers, createStore} from "redux";
import {ProfileReducer} from "./profile-reducer";
import {NavbarReducer} from "./navbar-reducer";
import {DialogsReducer} from "./dialogs-reducer";


let rootReducer = combineReducers({
    profilePage: ProfileReducer,
    navbarPage: NavbarReducer,
    dialogsPage: DialogsReducer

})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

(window as any).store = store;




