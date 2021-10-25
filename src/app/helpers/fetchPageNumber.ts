import {PaginationMeta} from '../interfaces'

export const range = (from: number, to: number, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

export function fetchPageNumber(paginationMeta: PaginationMeta): (string | number)[] {
  const {totalPageCount, currentPage} = paginationMeta
  const LEFT_PAGE = 'LEFT'
  const RIGHT_PAGE = 'RIGHT'
  const totalBlocks = 7

  if (totalPageCount <= totalBlocks) return range(1, totalPageCount)

  const averagePage = Math.floor(totalBlocks / 2)
  const startPage = Math.max((currentPage ?? 1) - averagePage, 1)
  const endPage = Math.min((currentPage ?? 1) + averagePage, totalPageCount)

  if (startPage === 1) return [...range(1, totalBlocks)]
  if (endPage === totalPageCount) {
    return [LEFT_PAGE, ...range(endPage - totalBlocks + 1, endPage - 1)]
  }

  return [LEFT_PAGE, ...range(startPage + 1, endPage - 1), RIGHT_PAGE]
}
