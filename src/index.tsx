import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export let dialogs = [
    {id: 1, name: 'Rabbit'},
    {id: 2, name: 'Leo'},
    {id: 3, name: 'Mouse'},
    {id: 4, name: 'Wolf'},
    {id: 5, name: 'Mouse'},
]

export let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is your IT'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Yo'},
    {id: 5, message: 'Bye'},
]

export let posts = [
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

]

ReactDOM.render(
    <App />,
  document.getElementById('root')
);