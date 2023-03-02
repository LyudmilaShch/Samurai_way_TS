import React, {useState} from 'react'
import s from './Paginator.module.scss';
import {ReactComponent as LeftArrow} from '../../../assets/images/leftArrow.svg';
import {ReactComponent as RightArrow} from '../../../assets/images/rightArrow.svg';

export type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}
export let Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged,portionSize=10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={s.pagination}>
            <button className={s.buttonIconContainer} onClick={() => {setPortionNumber(portionNumber -1) }} disabled={portionNumber <= 1 }>
                <LeftArrow className={s.buttonIcon}/>
            </button>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <div className={currentPage === p ? s.selectedPage : s.page}
                                onClick={(e) => {onPageChanged(p)}}>{p} </div>
                })}
            <button className={s.buttonIconContainer} onClick={() => {setPortionNumber(portionNumber + 1) }} disabled={portionCount <= portionNumber}>
                <RightArrow className={s.buttonIcon}/>
            </button>
    </div>
}