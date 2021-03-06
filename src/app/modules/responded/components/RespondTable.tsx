import React from 'react'
import {ReportType, TableType} from '../../../enums'
import {TableHeader} from '../../../interfaces'
import {ReportWithPaginationData} from '../../../interfaces/report.interface'
import {TablePage} from '../../base/table/TablePage'

type Props = {
  tableType: TableType
  type: ReportType
  data: ReportWithPaginationData
  tableHeader: TableHeader
  loading: Boolean
  changedReportDate: (date: string) => void
  changedRespondDate: (date: string) => void
  changedPenalty: (status: string) => void
  changedReport: (status: string) => void
  changedCategory?: (category: string) => void
  changedPostType?: (postType: string) => void
}

const RespondedTable: React.FC<Props> = (props) => {
  const {
    tableType,
    type,
    data,
    tableHeader,
    loading,
    changedReportDate,
    changedRespondDate,
    changedPenalty,
    changedReport,
    changedPostType,
  } = props

  return (
    <>
      <TablePage
        className='mb-5 mb-xl-8 h-75'
        tableType={tableType}
        tableHeader={tableHeader}
        type={type}
        data={data}
        changedReportDate={changedReportDate}
        changedRespondDate={changedRespondDate}
        changedPenalty={changedPenalty}
        changedReport={changedReport}
        changedPostType={changedPostType}
        loading={loading}
      />
    </>
  )
}

export {RespondedTable}
