import React, {useEffect, useState} from 'react'
import {ReportedTable} from '../modules/reported'
import {ReportType, TableType} from '../enums'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../setup'
import {ReportedState} from '../modules/reported/redux/reducer'
import {fetchAllReported} from '../modules/reported/redux/action'
import {ErrorsContent} from '../modules/errors/ErrorsContent'
import {LoadingContent} from '../modules/loading/LoadingContent'
import {reportedPostTHeader, reportedUserTHeader} from '../data'
import {Pagination} from '../modules/base/bar/Paginantion'
import {PageTitle} from '../../_metronic/layout/core'

type Props = {
  type: ReportType
}

const ReportedPage: React.FC<Props> = ({type}) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [reportDate, setReportDate] = useState('')
  const [category, setCategory] = useState('')
  const {reportedPost, reportedUser, loading, error} = useSelector<RootState, ReportedState>(
    (state) => state.reported
  )
  const dispatch = useDispatch()

  const changedPage = (number: number) => setPageNumber(number)
  const changedReportDate = (date: string) => setReportDate(date)
  const changedCategory = (category: string) => setCategory(category)

  useEffect(() => {
    dispatch(fetchAllReported(pageNumber, type, reportDate, category))
  }, [pageNumber, type, dispatch, reportDate, category])

  const data = type === ReportType.POST ? reportedPost : reportedUser
  const tableHeader = type === ReportType.POST ? reportedPostTHeader : reportedUserTHeader

  if (error) return <ErrorsContent />
  return (
    <>
      <PageTitle>{`MANAGE ${type.toUpperCase()}`}</PageTitle>
      {loading ? (
        <LoadingContent tableHeader={tableHeader} tableType={TableType.REPORTED} type={type} />
      ) : (
        <ReportedTable
          tableType={TableType.REPORTED}
          type={type}
          data={data}
          tableHeader={tableHeader}
          changedReportDate={changedReportDate}
          changedCategory={changedCategory}
        />
      )}
      <Pagination className='h-25' onChangedPage={changedPage} paginationMeta={data.meta} />
    </>
  )
}

export default ReportedPage
