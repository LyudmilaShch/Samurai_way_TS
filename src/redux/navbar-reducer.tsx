export type SidebarType = {
    name: string,
    avatar: string
    id: number
}
export type InitialStateType = {
    sidebar: Array<SidebarType>
}

let initialState = {
    sidebar: [
        {id: 1, name: 'Rabbit', avatar: "https://www.belanta.vet/vet-blog/wp-content/uploads/2019/11/1-6.jpg"},
        {id: 2, name: 'Leo', avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg"},
        {
            id: 3,
            name: 'Mouse',
            avatar: "https://st3.depositphotos.com/4431055/12920/i/600/depositphotos_129204976-stock-photo-gray-mouse-animal-and-cheese.jpg"
        }
    ] }


export const NavbarReducer = (state: InitialStateType = initialState) => {
    return state;
}

