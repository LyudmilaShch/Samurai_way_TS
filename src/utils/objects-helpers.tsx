import {UsersType} from "../redux/users-reducer";

export const updateObjectInArray = (items: Array<UsersType>, itemId: number, objPropName: string, newObjProps: any) => {
    items.map(u => {
        // @ts-ignore
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}