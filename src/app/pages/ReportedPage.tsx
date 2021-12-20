import React, {useLayoutEffect, useState} from 'react'
import {ReportedTable} from '../modules/reported'
import {ReportType, TableType} from '../enums'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../setup'
import {ReportedState} from '../modules/reported/redux/reducer'
import {fetchAllReported} from '../modules/reported/redux/action'
import {ErrorsContent} from '../modules/errors/ErrorsContent'
import {reportedPostTHeader, reportedUserTHeader} from '../data'
import {Pagination} from '../modules/base/bar/Paginantion'
import {PageTitle} from '../../_metronic/layout/core'
import {useHistory} from 'react-router-dom'

type Props = {
  type: ReportType
}

const ReportedPage: React.FC<Props> = ({type}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  let search = window.location.search
  let params = new URLSearchParams(search)

  const [pageNumber, setPageNumber] = useState(parseInt(params.get('page') ?? '1'))
  const [reportDate, setReportDate] = useState('')
  const [category, setCategory] = useState('')
  const [postType, setPostType] = useState('')
  const {reportedPost, reportedUser, loading, error} = useSelector<RootState, ReportedState>(
    (state) => state.reported
  )

  const changedPage = (number: number) => {
    setPageNumber(number)
    history.push({
      pathname: '/posts/reported',
      search: '?page=' + number,
    })
  }
  const changedReportDate = (date: string) => setReportDate(date)
  const changedCategory = (category: string) => setCategory(category)
  const changedPostType = (postType: string) => setPostType(postType)

  const data = type === ReportType.POST ? reportedPost : reportedUser

  useLayoutEffect(() => {
    dispatch(fetchAllReported(pageNumber, type, reportDate, category, postType))
  }, [pageNumber, type, dispatch, reportDate, category, postType])

  const tableHeader = type === ReportType.POST ? reportedPostTHeader : reportedUserTHeader

  if (error) return <ErrorsContent />
  return (
    <>
      <PageTitle>{`MANAGE ${type.toUpperCase()}`}</PageTitle>
      <ReportedTable
        tableType={TableType.REPORTED}
        type={type}
        data={data}
        tableHeader={tableHeader}
        changedReportDate={changedReportDate}
        changedCategory={changedCategory}
        changedPostType={changedPostType}
        loading={loading}
      />
      <Pagination className='h-25' onChangedPage={changedPage} paginationMeta={data.meta} />
    </>
  )
}

export default ReportedPage
