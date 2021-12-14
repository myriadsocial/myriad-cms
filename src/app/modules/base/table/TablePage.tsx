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
import {usePostReportList} from '../../../data/post-report-list.data'

type Props = {
  className: string
  tableType: TableType
  tableHeader: TableHeader
  type: ReportType
  data: ReportWithPaginationData
  loading: Boolean
  changedReportDate: (date: string) => void
  changedCategory?: (category: string) => void
  changedRespondDate?: (date: string) => void
  changedPenalty?: (status: string) => void
  changedReport?: (status: string) => void
  changedPostType?: (postType: string) => void
}

const TablePage: React.FC<Props> = (props) => {
  const {
    className,
    tableType,
    tableHeader,
    type,
    data,
    loading,
    changedReportDate,
    changedCategory,
    changedRespondDate,
    changedReport,
    changedPostType,
  } = props

  const {title, field1, field2, field3, field4, field5} = tableHeader
  const {reportedPost, reportedUser} = useSelector<RootState, ReportedState>(
    (state) => state.reported
  )
  const {respondedPost, respondedUser} = useSelector<RootState, RespondedState>(
    (state) => state.responded
  )

  const {
    filter: {reportDate: reportedReportDatePost, category: categoryPost, postType: postTypeReported},
  } = reportedPost
  const {
    filter: {reportDate: reportedReportDateUser},
  } = reportedUser

  const {
    filter: {reportDate: respondedReportDatePost, respondDate: respondDatePost, status: postStatus, postType: postTypeResponded},
  } = respondedPost
  const {
    filter: {reportDate: respondedReportDateUser, respondDate: respondDateUser, status: userStatus},
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

  const postCategories = usePostReportList()

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

  const onChangedPostType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (changedPostType) changedPostType(value)
  }

  return (
    <>
      <div className={`card ${className}`} style={{overflowY: 'scroll', height: '800px'}}>
        <div className='card-header border-0 mt-5 row'>
          <h3 className='card-title align-items-start flex-column col'>
            <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>
            <span className='text-muted mt-1 fw-bold fs-7'>{totalReport} reports</span>
          </h3>
          <div className='col'></div>
          <div className='col'></div>
          <div className='mb-3 col pt-3'>
            <InputGroup >
              <FormControl placeholder='Search' aria-label='Search' aria-describedby='basic-addon2' />
              <InputGroup.Text style={{cursor: 'pointer'}}>
                <i className='fas fa-search'></i>
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
        <div className='card-body py-3' style={{flex: '0 1 auto'}}>
          <div className='mb-3 d-inline-flex'>
            <InputGroup>
              <InputGroup.Text>
                <i className='far fa-calendar-minus'></i>
              </InputGroup.Text>
              <Form.Select value={reportDate} onChange={onChangedOrder}>
                <option disabled>Sort date</option>
                <option value='newest'>Newest</option>
                <option value='oldest'>Oldest</option>
              </Form.Select>
            </InputGroup>
            <span className='mx-5'></span>
            {type === ReportType.POST && tableType === TableType.REPORTED ? (
              <>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-filter'></i>
                  </InputGroup.Text>
                  <Form.Select value={category} onChange={onChangedCategory}>
                    <option disabled>Filter category</option>
                    <option value='all'>All Category</option>
                    {postCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <span className='mx-5'></span>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-filter'></i>
                  </InputGroup.Text>
                  <Form.Select value={postTypeReported} onChange={onChangedPostType}>
                  <option disabled>Post Type</option>
                  <option value='all'>All</option>
                  <option value='post'>Post</option>
                  <option value='comment'>Comment</option>
                  </Form.Select>
                </InputGroup>
              </>
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
                  <option value='newest'>Newest</option>
                  <option value='oldest'>Oldest</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
            <span className='mx-5'></span>
            {tableType === TableType.RESPONDED ? (
              <InputGroup>
                <InputGroup.Text>
                  <i className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Select
                  value={type === ReportType.USER ? userStatus : postStatus}
                  onChange={onChangedReportStatus}
                >
                  <option disabled>Post Status</option>
                  <option value='all'>All</option>
                  <option value='removed'>{type === ReportType.USER ? 'Banned' : 'Removed'}</option>
                  <option value='ignored'>Ignored</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
            <span className='mx-5'></span>
            {type === ReportType.POST && tableType === TableType.RESPONDED ? (
              <InputGroup>
                <InputGroup.Text>
                  <i className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Select
                  value={postTypeResponded}
                  onChange={onChangedPostType}
                >
                  <option disabled>Post Type</option>
                  <option value='all'>All</option>
                  <option value='post'>Post</option>
                  <option value='comment'>Comment</option>
                </Form.Select>
              </InputGroup>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className='card-body py-3'>
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
                {
                  loading ? (
                    <tr>
                      <td>
                        <div>Please wait...</div>
                      </td>
                    </tr>
                  ) : (
                    data.data.map((reported) => {
                      return (
                        <TableContent
                          key={reported.id}
                          tableType={tableType}
                          data={reported}
                          type={type}
                        />
                      )
                    })
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export {TablePage}
