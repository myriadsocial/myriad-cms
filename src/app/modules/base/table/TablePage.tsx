import React from 'react'
import {ReportType, TableType} from '../../../enums'
import {TableHeader} from '../../../interfaces'
import {ReportWithPaginationData} from '../../../interfaces/report.interface'
import {TableContent} from './components/TableContent'
import {Form, InputGroup, FormControl} from 'react-bootstrap-v5'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {ReportedState} from '../../reported/redux/reducer'
import {RespondedState} from '../../responded/redux/reducer'

type Props = {
  className: string
  tableType: TableType
  tableHeader: TableHeader
  type: ReportType
  data: ReportWithPaginationData
  changedReportDate: (date: string) => void
  changedCategory?: (category: string) => void
  changedRespondDate?: (date: string) => void
  changedPenalty?: (status: string) => void
  changedReport?: (status: string) => void
}

const TablePage: React.FC<Props> = (props) => {
  const {
    className,
    tableType,
    tableHeader,
    type,
    data,
    changedReportDate,
    changedCategory,
    changedRespondDate,
    changedReport,
    changedPenalty,
  } = props

  const {title, field1, field2, field3, field4, field5} = tableHeader
  const {reportedPost, reportedUser} = useSelector<RootState, ReportedState>(
    (state) => state.reported
  )
  const {respondedPost, respondedUser} = useSelector<RootState, RespondedState>(
    (state) => state.responded
  )

  const {
    filter: {reportDate: reportedReportDatePost, category: categoryPost},
  } = reportedPost
  const {
    filter: {reportDate: reportedReportDateUser},
  } = reportedUser

  const {
    filter: {reportDate: respondedReportDatePost, respondDate: respondDatePost, status},
  } = respondedPost
  const {
    filter: {reportDate: respondedReportDateUser, respondDate: respondDateUser, penaltyStatus},
  } = respondedUser

  const category = categoryPost
  const reportDate =
    tableType === TableType.REPORTED
      ? type === ReportType.POST
        ? reportedReportDatePost
        : reportedReportDateUser
      : type === ReportType.POST
      ? respondedReportDatePost
      : respondedReportDateUser

  const respondDate = type === ReportType.POST ? respondDatePost : respondDateUser
  const totalReport =
    tableType === TableType.REPORTED
      ? type === ReportType.POST
        ? reportedPost.meta.totalItemCount
        : reportedPost.meta.totalItemCount
      : type === ReportType.POST
      ? respondedPost.meta.totalItemCount
      : respondedPost.meta.totalItemCount

  const onChangedOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    changedReportDate(value)
  }

  const onChangedCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (changedCategory) changedCategory(value)
  }

  const onChangedRespondDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (changedRespondDate) changedRespondDate(value)
  }

  const onChangedReportStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (changedReport) changedReport(value)
  }

  const onChangedPenaltyStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (changedPenalty) changedPenalty(value)
  }

  return (
    <>
      <div className={`card ${className}`} style={{overflowY: 'scroll', height: '75%'}}>
        <div className='card-header border-0 pt-5 row'>
          <h3 className='card-title align-items-start flex-column col'>
            <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>
            <span className='text-muted mt-1 fw-bold fs-7'>{totalReport} reports</span>
          </h3>
          <div className='col'></div>
          <div className='col'></div>
          <InputGroup className='mb-3 col'>
            <FormControl placeholder='Search' aria-label='Search' aria-describedby='basic-addon2' />
            <InputGroup.Text style={{cursor: 'pointer'}}>
              <i className='fas fa-search'></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className='card-body py-3'>
          <div className='mb-3 d-inline-flex'>
            <InputGroup>
              <InputGroup.Text>
                <i className='far fa-calendar-minus'></i>
              </InputGroup.Text>
              <Form.Select value={reportDate} onChange={onChangedOrder}>
                <option disabled>Sort date</option>
                <option value='all'>All</option>
                <option value='newest'>Newest - oldest</option>
                <option value='oldest'> Oldest - newest</option>
              </Form.Select>
            </InputGroup>
            <span className='mx-5'></span>
            {type === ReportType.POST && tableType === TableType.REPORTED ? (
              <InputGroup>
                <InputGroup.Text>
                  <i className='fas fa-filter'></i>
                </InputGroup.Text>
                <Form.Select value={category} onChange={onChangedCategory}>
                  <option disabled>Filter category</option>
                  <option value='all'>All Category</option>
                  <option value='Trademark'>Trademark</option>
                  <option value='Copyright material'>Copyright material</option>
                  <option value='Child exploit'>Child exploit</option>
                  <option value='Pornography'>Pornography</option>
                  <option value='Private Information'>Private Information</option>
                  <option value='Abusive and violent'>Abusive and violent</option>
                  <option value='Spam and system abuse'>Spam and system abuse</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
            {tableType === TableType.RESPONDED ? (
              <InputGroup>
                <InputGroup.Text>
                  <i className='far fa-hand-paper'></i>
                </InputGroup.Text>
                <Form.Select value={respondDate} onChange={onChangedRespondDate}>
                  <option disabled>Respond Date</option>
                  <option value='all'>All</option>
                  <option value='latest'>Latest</option>
                  <option value='oldest'>Oldest</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
            <span className='mx-5'></span>
            {tableType === TableType.RESPONDED && type === ReportType.POST ? (
              <InputGroup>
                <InputGroup.Text>
                  <i className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Select value={status} onChange={onChangedReportStatus}>
                  <option disabled>Post Status</option>
                  <option value='all'>All</option>
                  <option value='removed'>Removed</option>
                  <option value='ignored'>Ignored</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
            {tableType === TableType.RESPONDED && type === ReportType.USER ? (
              <InputGroup>
                <InputGroup.Text>
                  <i className='fas fa-unlock-alt'></i>
                </InputGroup.Text>
                <Form.Select value={penaltyStatus} onChange={onChangedPenaltyStatus}>
                  <option disabled>Penalty Status</option>
                  <option value='all'>All</option>
                  <option value='banned'>Banned</option>
                  <option value='penalty 1'>Penalty 1</option>
                  <option value='penalty 2'>Penalty 2</option>
                  <option value='penalty 3'>Penalty 3</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
          </div>

          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bolder text-muted'>
                  <th style={{width: '40%'}} className='rounded-start'>
                    {field1}
                  </th>
                  <th style={{width: '15%'}}>{field2}</th>
                  <th style={{width: '15%'}}>{field3}</th>
                  <th style={{width: '15%'}}>{field4}</th>
                  <th style={{width: '15%'}} className='rounded-end'>
                    {field5}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((reported) => {
                  return (
                    <TableContent
                      key={reported.id}
                      tableType={tableType}
                      data={reported}
                      type={type}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export {TablePage}
