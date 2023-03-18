import {actions, ProfileReducer} from "./profile-reducer";

let state = {
    posts: [
        {
            id: 1,
            message: "Fur-fur-fur",
            avatar: "https://oir.mobi/uploads/posts/2021-04/1619183869_43-oir_mobi-p-khitraya-lisa-zhivotnie-krasivo-foto-49.jpg",
            countlike: 5
        },
        {
            id: 2,
            message: "Keooo-keooo",
            avatar: "http://simple-fauna.ru/wp-content/uploads/2018/06/belki.jpg",
            countlike: 7
        },
        {
            id: 3,
            message: "R-r-r-r-r-r",
            avatar: "https://vsezhivoe.ru/wp-content/uploads/2017/10/lev-14851893401673.jpg",
            countlike: 15
        },
        {
            id: 4,
            message: "I am deer",
            avatar: "https://www.kalashnikov.ru/wp-content/uploads/2021/04/natsionalnyi-park-ssha-priroda-1024x1024.jpg",
            countlike: 12
        },
    ],
    profile:  null,
    status: " ",
    newPostText: " ",
    photos: " "
}
test ('length of post should be incremented', () => {
    //1. test data
    let action = actions.addPostCreator("it.com")

    //2. action
    let newState = ProfileReducer( state, action)

    //3. expectation
    expect(newState.posts.length).toBe(5)
})

test ('message of new post should be  "it.com"', () => {
    //1. test data
    let action = actions.addPostCreator("it.com")

    //2. action
    let newState = ProfileReducer( state, action)

    //3. expectation
    expect(newState.posts[0].message).toBe("it.com")
})

test ('length of post should be decremented', () => {
    //1. test data
    let action = actions.deletePostCreator(1)

    //2. action
    let newState = ProfileReducer( state, action)

    //3. expectation
    expect(newState.posts.length).toBe(3)
})
test ('after deleting length of messages should be decrement', () => {
    //1. test data
    let action = actions.deletePostCreator(1000)

    //2. action
    let newState = ProfileReducer( state, action)

    //3. expectation
    expect(newState.posts.length).toBe(4)
})
