import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ProfileReducer} from "./profile-reducer";
import {NavbarReducer} from "./navbar-reducer";
import {DialogsReducer} from "./dialogs-reducer";
import {UsersReducer} from "./users-reducer";
import {AuthReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";



let rootReducer = combineReducers({
    profilePage: ProfileReducer,
    navbarPage: NavbarReducer,
    dialogsPage: DialogsReducer,
    usersPage: UsersReducer,
    auth: AuthReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

(window as any).store = store;




