import React, {Component, ComponentType, Suspense} from "react";
import {Preloader} from "../Components/common/preloader/Preloader";
import {AppStateType} from "../redux/redux-store";

type MapStatePropsType = {

}
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
    }
}
export function withSuspense<T>(Component: ComponentType<T>) {

    return (props: MapStatePropsType) => {
        <Suspense fallback={<Preloader/>}>
            <Component {...props as T}/>
        </Suspense>
    }
}
