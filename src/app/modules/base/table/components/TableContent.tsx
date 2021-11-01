import React from 'react'
import {ReportStatusType, ReportType, TableType} from '../../../../enums'
import {Report} from '../../../../interfaces'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {useDispatch} from 'react-redux'
import {fetchAllReporters} from '../../../reporters/redux/action'
import {ReportActionModal} from '../../modal/ReportActionModal'

type Props = {
  tableType: TableType
  type: ReportType
  data: Report
}

const listProfileImage = [
  '/media/svg/avatars/001-boy.svg',
  '/media/svg/avatars/047-girl-25.svg',
  '/media/svg/avatars/006-girl-3.svg',
  '/media/svg/avatars/020-girl-11.svg',
  '/media/svg/avatars/014-girl-7.svg',
]

const TableContent: React.FC<Props> = ({tableType, data, type}) => {
  const defaultProfilePictureURL =
    listProfileImage[Math.floor(Math.random() * listProfileImage.length)]
  const dispatch = useDispatch()

  const getReporters = () => {
    dispatch(fetchAllReporters(data.id, data.referenceType, data.referenceId))
  }

  const reportedPostData = () => {
    return (
      <>
        <td>
          <span className='badge badge-light-success'>{data.type}</span>
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
          <span className='badge badge-light-success'>{status}</span>
        </td>
      </>
    )
  }

  // Reported Detail Profile
  let profileImage = null
  let reportedName = null
  let reportedDetail = null
  // let tableData = null;

  if (!data.reportedPost) {
    if (type === ReportType.USER) {
      profileImage = data.reportedUser.profilePictureURL ?? defaultProfilePictureURL
      reportedName = data.reportedUser.name
      reportedDetail =
        'Join date ' +
        new Date(data.reportedUser ? data.reportedUser.createdAt : '').toLocaleDateString('en-GB')
    } else {
      profileImage = data.reportedComment.user.profilePictureURL ?? defaultProfilePictureURL
      reportedName = data.reportedComment.user.name
      reportedDetail = data.reportedComment.text
    }
  } else {
    profileImage = data.reportedPost.user.profilePictureURL ?? defaultProfilePictureURL
    reportedName = data.reportedPost.user.name
    reportedDetail = data.reportedPost.text
  }

  // const referenceId = !data.reportedPost ?

  const tableData =
    tableType === TableType.REPORTED
      ? type === ReportType.POST
        ? reportedPostData()
        : reportedUserData()
      : respondedData()

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
              <span className='text-muted fw-bold text-muted d-block fs-7'>{reportedDetail}</span>
            </div>
          </div>
        </td>
        <td>
          <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
            {new Date(data.createdAt).toLocaleDateString('en-GB')}
          </span>
          {!data.reportedPost ? (
            type === ReportType.USER ? (
              <></>
            ) : (
              <span className='text-muted fw-bold text-muted d-block fs-7'>comment</span>
            )
          ) : (
            <span className='text-muted fw-bold text-muted d-block fs-7'>
              {data.reportedPost?.platform}
            </span>
          )}
        </td>
        {tableData}
        <td>
          <button
            className='btn btn-sm btn-light-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_report_action'
            onClick={getReporters}
          >
            Respond
          </button>
          <ReportActionModal
            totalReporters={data.totalReported}
            reportId={data.id}
            type={data.referenceType}
            tableType={tableType}
          />
        </td>
      </tr>
    </>
  )
}

export {TableContent}
