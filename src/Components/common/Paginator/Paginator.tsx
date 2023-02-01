import React, {useState} from 'react'
import s from "./Paginator.module.css";

export type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}
export let Paginator = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;


    return <div>
            <button onClick={() => {setPortionNumber(portionNumber -1) }} disabled={portionNumber <= 1 }>
                Prev
            </button>
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={props.currentPage === p ? s.selectedPage : " "}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p} </span>
            })}
            <button onClick={() => {setPortionNumber(portionNumber + 1) }} disabled={portionCount <= portionNumber}>
                Next
            </button>
    </div>
}