import React, {useEffect, useState} from 'react'
import {RespondedTable} from './components/RespondTable'
import {ReportType, TableType} from '../../enums'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {RespondedState} from './redux/reducer'
import {fetchAllResponded} from './redux/action'
import {LoadingContent} from '../loading/LoadingContent'
import {ErrorsContent} from '../errors/ErrorsContent'
import {respondedPostTHeader, deletedUserTHeader} from '../../data'
import {Pagination} from '../base/bar/Paginantion'

type Props = {
  type: ReportType
}

const ReportedPage: React.FC<Props> = ({type}) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [reportDate, setReportDate] = useState('')
  const [penalty, setPenalty] = useState('')
  const [reportStatus, setReportStatus] = useState('')
  const [respondDate, setRespondDate] = useState('')

  const {respondedPost, respondedUser, loading, error} = useSelector<RootState, RespondedState>(
    (state) => state.responded
  )
  const dispatch = useDispatch()

  const changedPage = (number: number) => setPageNumber(number)
  const changedReportDate = (date: string) => setReportDate(date)
  const changedRespondDate = (date: string) => setRespondDate(date)
  const changedPenalty = (status: string) => setPenalty(status)
  const changedReport = (status: string) => setReportStatus(status)

  useEffect(() => {
    dispatch(fetchAllResponded(pageNumber, type, reportDate, respondDate, penalty, reportStatus))
  }, [pageNumber, type, dispatch, reportDate, respondDate, penalty, reportStatus])

  const data = type === ReportType.POST ? respondedPost : respondedUser
  const tableHeader = type === ReportType.POST ? respondedPostTHeader : deletedUserTHeader

  if (error) return <ErrorsContent />
  return (
    <>
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
        />
      )}
      <Pagination className='h-25' onChangedPage={changedPage} paginationMeta={data.meta} />
    </>
  )
}

export default ReportedPage
