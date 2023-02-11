import React, {useState} from 'react'
import s from "./Paginator.module.scss";
import {ReactComponent as LeftArrow} from "../../../assets/images/leftArrow.svg";
import {ReactComponent as RightArrow} from "../../../assets/images/rightArrow.svg";

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


    return <div className={s.pagination}>
            <button className={s.buttonIconContainer} onClick={() => {setPortionNumber(portionNumber -1) }} disabled={portionNumber <= 1 }>
                <LeftArrow className={s.buttonIcon}/>
            </button>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <div className={props.currentPage === p ? s.selectedPage : s.page}
                                onClick={(e) => {
                                    props.onPageChanged(p)
                                }}>{p} </div>
                })}
            <button className={s.buttonIconContainer} onClick={() => {setPortionNumber(portionNumber + 1) }} disabled={portionCount <= portionNumber}>
                <RightArrow className={s.buttonIcon}/>
            </button>
    </div>
}