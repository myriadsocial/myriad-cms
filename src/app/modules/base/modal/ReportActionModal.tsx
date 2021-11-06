/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {ConfirmationModal} from './ConfimationModal'
import {ReportStatusType, ReportType, TableType} from '../../../enums'
import {useDispatch, useSelector} from 'react-redux'
import {updateAllReported} from '../../reported/redux/action'
import {updateAllResponded} from '../../responded/redux/action'
import {RootState} from '../../../../setup'
import {ReporterState} from '../../reporters/redux/reducer'
import {useDefaultProfileImageUrl} from '../../../data'

type Props = {
  reportId: string
  type: ReportType
  totalReporters: number
  tableType: TableType
}

const ReportActionModal: React.FC<Props> = ({totalReporters, type, tableType}) => {
  const {reportId, reporters, referenceType, referenceId, loading} = useSelector<
    RootState,
    ReporterState
  >((state) => state.reporters)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const defaultProfilePictureURL = useDefaultProfileImageUrl()
  const openConfirmation = () => setShowModal(true)

  const ignoreReport = async () => {
    dispatch(updateAllReported(reportId, type))
    return await fetch(`${process.env.REACT_APP_API_URL}/reports/${reportId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: ReportStatusType.IGNORED,
        updatedAt: new Date(),
      }),
    })
  }

  const removedReport = async () => {
    setShowModal(false)
    dispatch(updateAllReported(reportId, type))
    return await fetch(`${process.env.REACT_APP_API_URL}/reports/${reportId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status:
          type === ReportType.POST || type === ReportType.COMMENT
            ? ReportStatusType.REMOVED
            : ReportStatusType.APPROVED,
        updatedAt: new Date(),
      }),
    })
  }

  const activate = async () => {
    setShowModal(false)
    dispatch(updateAllResponded(reportId, type))
    return await fetch(`${process.env.REACT_APP_API_URL}/reports/${reportId}/restore`, {
      method: 'POST',
      mode: 'cors',
    })
  }

  const onHide = () => setShowModal(false)
  const onRemoved = tableType === TableType.REPORTED ? removedReport : activate

  let actionButton = null

  if (tableType === TableType.REPORTED) {
    if (type === ReportType.POST) {
      actionButton = 'Remove'
    } else if (type === ReportType.COMMENT) {
      actionButton = 'Remove'
    } else {
      actionButton = 'Ban User'
    }
  } else {
    if (type === ReportType.POST) {
      actionButton = 'Restore'
    } else if (type === ReportType.COMMENT) {
      actionButton = 'Restore'
    } else {
      actionButton = 'Activate'
    }
  }

  let modalTitle1 = tableType === TableType.REPORTED ? 'Reported' : 'Removed'

  const filter = {
    include: [
      {
        relation: 'comments',
        scope: {
          where: {
            id: referenceId,
          },
        },
      },
    ],
  }

  console.log(reporters)

  return (
    <>
      <div className='modal fade' id='kt_modal_report_action' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <div className='modal-header pb-0 border-0 justify-content-end'>
              <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>

            <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
              <div className='text-left mb-5'>
                <h4 className='mb-1'>
                  {modalTitle1} {referenceType} action
                </h4>

                <span className='text-muted fs-7'>{totalReporters} users</span>
              </div>

              <div className='text-left mb-5'>
                <span className='text-muted fs-7'>
                  {referenceType[0].toUpperCase() + referenceType.substring(1)} URL
                </span>
                <p className='mt-2'>
                  <a
                    href={
                      referenceType === ReportType.COMMENT
                        ? `${process.env.REACT_APP_API_URL}/${
                            referenceType + 's'
                          }/${referenceId}/posts?filter=${JSON.stringify(filter)}`
                        : `${process.env.REACT_APP_WEB_URL}/${referenceType}/${referenceId}`
                    }
                  >
                    {process.env.REACT_APP_WEB_URL}/{referenceType}/{referenceId}
                  </a>
                </p>
              </div>
              <hr />
              <div className='mb-10'>
                <div className='fs-7 mb-2 text-muted'>Reported by ({totalReporters} users)</div>

                {loading ? (
                  <div className='mh-300px scroll-y me-n7 pe-7'>Please wait..</div>
                ) : (
                  <div className='mh-300px scroll-y me-n7 pe-7'>
                    {reporters.data.map((user) => {
                      return (
                        <div key={user.id} className='d-flex align-items-center'>
                          <div className='symbol symbol-50px me-5'>
                            <span className='symbol-label bg-light'>
                              <img
                                src={toAbsoluteUrl(
                                  user.reporter.profilePictureURL ?? defaultProfilePictureURL
                                )}
                                className='h-75 align-self-end'
                                alt=''
                              />
                            </span>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <a
                              href='#'
                              className='text-dark fw-bolder text-hover-primary mb-1 fs-6'
                            >
                              {user.reporter.name}
                            </a>
                            {tableType === 'responded' && type === ReportType.USER ? (
                              <></>
                            ) : (
                              <span className='text-muted text-muted d-block fs-7'>
                                {user.description}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className='d-flex flex-stack'>
                {tableType === 'reported' ? (
                  <button
                    className='btn btn-sm btn-warning'
                    onClick={ignoreReport}
                    data-bs-dismiss='modal'
                  >
                    Ignore
                  </button>
                ) : (
                  <button className='btn btn-sm btn-warning' data-bs-dismiss='modal'>
                    Cancel
                  </button>
                )}
                <button className='btn btn-sm btn-info' onClick={openConfirmation}>
                  {actionButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        showModal={showModal}
        onHide={onHide}
        onRemoved={onRemoved}
        tableType={tableType}
        type={referenceType}
      />
    </>
  )
}

export {ReportActionModal}
