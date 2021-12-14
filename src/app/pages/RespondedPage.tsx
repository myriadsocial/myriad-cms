import React, {useEffect, useState} from 'react'
import {RespondedTable} from '../modules/responded'
import {ReportType, TableType} from '../enums'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../setup'
import {RespondedState} from '../modules/responded/redux/reducer'
import {fetchAllResponded} from '../modules/responded/redux/action'
import {LoadingContent} from '../modules/loading/LoadingContent'
import {ErrorsContent} from '../modules/errors/ErrorsContent'
import {respondedPostTHeader, deletedUserTHeader} from '../data'
import {Pagination} from '../modules/base/bar/Paginantion'
import {PageTitle} from '../../_metronic/layout/core'

type Props = {
  type: ReportType
}

const ReportedPage: React.FC<Props> = ({type}) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [reportDate, setReportDate] = useState('')
  const [penalty, setPenalty] = useState('')
  const [reportStatus, setReportStatus] = useState('')
  const [respondDate, setRespondDate] = useState('')
  const [postType, setPostType] = useState('')

  const {respondedPost, respondedUser, loading, error} = useSelector<RootState, RespondedState>(
    (state) => state.responded
  )
  const dispatch = useDispatch()

  const changedPage = (number: number) => setPageNumber(number)
  const changedReportDate = (date: string) => setReportDate(date)
  const changedRespondDate = (date: string) => setRespondDate(date)
  const changedPenalty = (status: string) => setPenalty(status)
  const changedReport = (status: string) => setReportStatus(status)
  const changedPostType = (postType: string) => setPostType(postType)

  useEffect(() => {
    dispatch(fetchAllResponded(
      pageNumber, 
      type, 
      reportDate, 
      respondDate, 
      reportStatus, 
      postType))
  }, [
    pageNumber, 
    type, 
    dispatch, 
    reportDate, 
    respondDate, 
    penalty, 
    reportStatus, 
    postType
  ])

  const data = type === ReportType.POST ? respondedPost : respondedUser
  const tableHeader = type === ReportType.POST ? respondedPostTHeader : deletedUserTHeader

  if (error) return <ErrorsContent />
  return (
    <>
      <PageTitle>{`MANAGE ${type.toUpperCase()}`}</PageTitle>
      {loading ? (
        <LoadingContent tableHeader={tableHeader} tableType={TableType.RESPONDED} type={type} />
      ) : (
        <RespondedTable
          tableType={TableType.RESPONDED}
          type={type}
          data={data}
          tableHeader={tableHeader}
          changedReportDate={changedReportDate}
          changedRespondDate={changedRespondDate}
          changedPenalty={changedPenalty}
          changedReport={changedReport}
          changedPostType={changedPostType}
        />
      )}
      <Pagination className='h-25' onChangedPage={changedPage} paginationMeta={data.meta} />
    </>
  )
}

export default ReportedPage
