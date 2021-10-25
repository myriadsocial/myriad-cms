import React, {useEffect, useState} from 'react'
import {PaginationMeta} from '../../../interfaces'
import {fetchPageNumber} from '../../../helpers/fetchPageNumber'

type Props = {
  className: string
  paginationMeta: PaginationMeta
  onChangedPage: (number: number) => void
}

const Pagination: React.FC<Props> = ({className, onChangedPage, paginationMeta}) => {
  const [pageRange, setPageRange] = useState(['', 1])
  const {previousPage, currentPage, nextPage, totalPageCount} = paginationMeta

  useEffect(() => {
    setPageRange(fetchPageNumber(paginationMeta))
  }, [paginationMeta])

  return (
    <div className={className}>
      <ul className='pagination pagination-outline'>
        <li
          className={`page-item m-1 previous ${previousPage === undefined ? 'disabled' : ''}`}
          style={{cursor: 'pointer'}}
        >
          <span className='page-link' onClick={() => onChangedPage(previousPage ?? 0)}>
            <i className='fas fa-angle-left'></i>
          </span>
        </li>
        {pageRange.map((page, i) => {
          if (page === 'LEFT') {
            return (
              <li key={i} className='m-1 page-item' style={{cursor: 'pointer'}}>
                <span className='page-link' onClick={() => onChangedPage(1)}>
                  <i className='fas fa-angle-double-left'></i>
                </span>
              </li>
            )
          }

          if (page === 'RIGHT') {
            return (
              <li key={i} className='m-1 page-item' style={{cursor: 'pointer'}}>
                <span className='page-link' onClick={() => onChangedPage(totalPageCount)}>
                  <i className='fas fa-angle-double-right'></i>
                </span>
              </li>
            )
          }

          return (
            <li
              key={i}
              className={`m-1 page-item ${currentPage === page ? 'active' : ''}`}
              style={{cursor: 'pointer'}}
            >
              <span className='page-link' onClick={() => onChangedPage(Number(page))}>
                {page}
              </span>
            </li>
          )
        })}

        <li
          className={`m-1 page-item next ${nextPage === undefined ? 'disabled' : ''}`}
          style={{cursor: 'pointer'}}
        >
          <span className='page-link' onClick={() => onChangedPage(nextPage ?? 0)}>
            <i className='fas fa-angle-right'></i>
          </span>
        </li>
      </ul>
    </div>
  )
}

export {Pagination}
