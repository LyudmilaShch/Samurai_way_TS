import React from 'react'
import s from "./Paginator.module.css";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void

}
export let Paginator = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return <div>
        {slicedPages.map(p => {
            return <span className={props.currentPage === p ? s.selectedPage : " "}
                         onClick={(e) => {
                             props.onPageChanged(p)
                         }}>{p} </span>
        })}
    </div>
}