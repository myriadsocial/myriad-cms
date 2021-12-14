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
  changedReportDate: (date: string) => void
  changedCategory: (category: string) => void
  changedRespondDate?: (date: string) => void
  changedPostType?: (postType: string) => void
}

const ReportedTable: React.FC<Props> = (props) => {
  const {
    tableType, 
    type, 
    data, 
    tableHeader, 
    changedReportDate, 
    changedCategory, 
    changedPostType
  } = props

  return (
    <>
      <TablePage
        className='mb-5 mb-xl-8'
        tableType={tableType}
        tableHeader={tableHeader}
        type={type}
        data={data}
        changedReportDate={changedReportDate}
        changedCategory={changedCategory}
        changedPostType={changedPostType}
      />
    </>
  )
}

export {ReportedTable}
