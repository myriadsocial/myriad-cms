import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown'
import {ReportStatusType, ReportType, TableType} from '../../../../enums'
import {Report} from '../../../../interfaces'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {useDispatch} from 'react-redux'
import {fetchAllReporters} from '../../../reporters/redux/action'
import {ReportActionModal} from '../../../reporters'
import {usePostReportList, useDefaultProfileImageUrl, usePostStatusList} from '../../../../data/'
import {PostRender, ShowMore} from '../../../postRender'
import remarkGFM from 'remark-gfm'
import remarkHTML from 'remark-html'

type Props = {
  tableType: TableType
  type: ReportType
  data: Report
}

const TableContent: React.FC<Props> = ({tableType, data, type}) => {
  const defaultProfilePictureURL = useDefaultProfileImageUrl()
  const [showRespond, setShowRespond] = useState<boolean>(false)
  const [maxLength, setMaxLength] = useState<number | undefined>(250)
  const dispatch = useDispatch()

  const onHideRespond = () => {
    setShowRespond(false)
  }

  const postReportList = usePostReportList()
  const postReport = postReportList.find((post) => post.id === data.type)
  const title = postReport?.title
  const color = postReport?.color

  const postStatusList = usePostStatusList()
  const postStatus = postStatusList.find((post) => post.id === data.status)
  const statusColor = postStatus?.color

  const getReporters = () => {
    setShowRespond(true)
    dispatch(fetchAllReporters(data.id, data.referenceType, data.referenceId))
  }

  const reportedPostData = () => {
    return (
      <>
        <td>
          <span className={`badge badge-light-${color}`}>{title}</span>
        </td>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{data.totalReported} users</td>
      </>
    )
  }

  const reportedUserData = () => {
    return (
      <>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>{data.totalReported} users</td>
        <td>
          <span className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
            {data.reporters[0].description}
          </span>
        </td>
      </>
    )
  }

  const respondedData = () => {
    const status =
      type === ReportType.USER
        ? data.status === ReportStatusType.IGNORED
          ? data.status
          : data.penaltyStatus
        : data.status

    const respondDate = new Date(data.updatedAt).toLocaleDateString('en-GB')

    return (
      <>
        <td className='text-dark fw-bolder text-hover-primary fs-6'>
          <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {respondDate}
          </span>
          <span className='text-muted fw-bold text-muted d-block fs-7'>admin 1</span>
        </td>
        <td>
          <span className={`badge badge-light-${statusColor}`}>{status}</span>
        </td>
      </>
    )
  }

  // Reported Detail Profile
  let profileImage = data.reportedDetail.user.profilePictureURL ?? defaultProfilePictureURL
  let reportedName = data.reportedDetail.user.name
  let reportedDetail = data.reportedDetail.text as string
  // let tableData = null;

  if (type === ReportType.USER) {
    reportedDetail =
      'Join date ' +
      new Date(data.reportedDetail ? data.reportedDetail.user.createdAt : '').toLocaleDateString(
        'en-GB'
      )
  }

  const reportedInfo = () => {
    if (type === ReportType.USER) {
      const userReportedInfo =
        'Join date ' +
        new Date(data.reportedDetail ? data.reportedDetail.user.createdAt : '').toLocaleDateString(
          'en-GB'
        )

      return <>{userReportedInfo}</>
    }

    if (type === ReportType.COMMENT) {
      return <>{data.reportedDetail.text}</>
    }

    if (data.reportedDetail.platform === 'reddit') {
      const postText = data.reportedDetail.text ?? ''
      return (
        <>
          <ReactMarkdown skipHtml remarkPlugins={[remarkGFM, remarkHTML]}>
            {postText.slice(0, maxLength)}
          </ReactMarkdown>

          {!!maxLength && postText.length > maxLength ? (
            <ShowMore onClick={() => setMaxLength(undefined)} />
          ) : (
            <></>
          )}
        </>
      )
    }

    if (data.reportedDetail.platform === 'twitter') {
      return <>{data.reportedDetail.text ?? ''}</>
    }

    return (
      <PostRender
        postText={reportedDetail}
        max={maxLength}
        onShowAll={() => setMaxLength(undefined)}
        onShowLess={() => setMaxLength(250)}
      />
    )
  }

  const tableData =
    tableType === TableType.REPORTED
      ? type === ReportType.POST
        ? reportedPostData()
        : reportedUserData()
      : respondedData()

  const disabledModal = () => {
    if (tableType === TableType.RESPONDED && data.status === ReportStatusType.IGNORED) {
      return true
    }

    return false
  }

  return (
    <>
      <tr>
        <td>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-50px me-5'>
              <span className='symbol-label bg-light'>
                <img src={toAbsoluteUrl(profileImage)} className='h-75 align-self-end' alt='' />
              </span>
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <span className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                {reportedName}
              </span>
              <span className='text-muted fw-bold text-muted d-block fs-7'>{reportedInfo()}</span>
            </div>
          </div>
        </td>
        <td>
          <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {new Date(data.createdAt).toLocaleDateString('en-GB')}
          </span>
          {data.referenceType === ReportType.USER ? (
            <></>
          ) : data.referenceType === ReportType.POST ? (
            <span className='text-muted fw-bold text-muted d-block fs-7'>
              {data.reportedDetail?.platform}
            </span>
          ) : (
            <span className='text-muted fw-bold text-muted d-block fs-7'>comment</span>
          )}
        </td>
        {tableData}
        <td>
          <button
            className='btn btn-sm btn-light-primary'
            data-bs-toggle='modal'
            data-bs-target='#report_action'
            onClick={getReporters}
            disabled={disabledModal()}
          >
            Respond
          </button>
          <ReportActionModal
            showRespond={showRespond}
            totalReporters={data.totalReported}
            reportId={data.id}
            type={data.referenceType}
            tableType={tableType}
            onHideRespond={onHideRespond}
          />
        </td>
      </tr>
    </>
  )
}

export {TableContent}
