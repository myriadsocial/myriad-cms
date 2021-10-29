import {ReportStatusType, ReportType} from '../../../enums'
import {ReportWithPaginationData} from '../../../interfaces'
import * as constants from './constant'

export interface LoadAllRespondedPost {
  type: constants.FETCH_ALL_RESPONDED_POST_TYPE
  allRespondedPost: ReportWithPaginationData
  loading: boolean
}

export interface LoadAllRespondedUser {
  type: constants.FETCH_ALL_RESPONDED_USER_TYPE
  allRespondedUser: ReportWithPaginationData
  loading: boolean
}

export interface LoadUpdatedRespondedUser {
  type: constants.UPDATE_ALL_RESPONDED_USER_TYPE
  reportId: string
  loading: boolean
}

export interface LoadUpdatedRespondedPost {
  type: constants.UPDATE_ALL_RESPONDED_POST_TYPE
  reportId: string
  loading: boolean
}

export interface SetLoading {
  type: constants.LOADING_TYPE
  loading: boolean
}

export interface SetError {
  type: constants.ERROR_TYPE
  error: boolean
  loading: boolean
}

export type Actions =
  | LoadAllRespondedPost
  | LoadAllRespondedUser
  | LoadUpdatedRespondedUser
  | LoadUpdatedRespondedPost
  | SetLoading
  | SetError

export const fetchAllResponded = (
  pageNumber = 1,
  type: ReportType,
  reportDate = '',
  respondDate = '',
  penalty = '',
  status = ''
) => {
  return async (dispatch: any) => {
    dispatch({
      type: constants.LOADING,
    })

    let newOrder = undefined
    let penaltyStatus = undefined
    let reportStatus = undefined

    if (reportDate === 'all') {
      switch (respondDate) {
        case 'all':
          newOrder = ['']
          break

        case 'latest':
          newOrder = ['updatedAt DESC']
          break

        case 'oldest':
          newOrder = ['updatedAt ASC']
          break

        default:
          newOrder = ['']
      }
    }

    if (reportDate === 'newest') {
      switch (respondDate) {
        case 'all':
          newOrder = ['createdAt DESC']
          break

        case 'latest':
          newOrder = ['createdAt DESC', 'updatedAt DESC']
          break

        case 'oldest':
          newOrder = ['createdAt DESC', 'updatedAt ASC']
          break

        default:
          newOrder = ['createdAt DESC']
      }
    }

    if (reportDate === 'oldest') {
      switch (respondDate) {
        case 'all':
          newOrder = ['createdAt ASC']
          break

        case 'latest':
          newOrder = ['createdAt ASC', 'updatedAt DESC']
          break

        case 'oldest':
          newOrder = ['createdAt ASC', 'updatedAt ASC']
          break

        default:
          newOrder = ['createdAt ASC']
      }
    }

    if (type === ReportType.USER) {
      penaltyStatus = penalty === '' || penalty === 'all' ? undefined : penalty
    }

    if (type === ReportType.POST) {
      reportStatus = status === '' || status === 'all' ? undefined : status
    }

    try {
      const filter = {
        where: {
          or: [
            {status: ReportStatusType.IGNORED},
            {status: ReportStatusType.REMOVED},
            {status: ReportStatusType.APPROVED},
          ],
          penaltyStatus: penaltyStatus,
          status: reportStatus,
        },
        order: newOrder,
      }

      if (type === ReportType.COMMENT || type === ReportType.POST) {
        filter.where = Object.assign(filter.where, {
          or: [
            {
              referenceType: ReportType.POST,
              status: {
                inq: [
                  ReportStatusType.APPROVED,
                  ReportStatusType.IGNORED,
                  ReportStatusType.REMOVED,
                ],
              },
            },
            {
              referenceType: ReportType.COMMENT,
              status: {
                inq: [
                  ReportStatusType.APPROVED,
                  ReportStatusType.IGNORED,
                  ReportStatusType.REMOVED,
                ],
              },
            },
          ],
        })
      } else {
        filter.where = Object.assign(filter.where, {
          referenceType: ReportType.USER,
        })
      }

      //TODO: Moved to env
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reports?pageNumber=${pageNumber}&filter=${JSON.stringify(
          filter
        )}`
      )
      const data = await response.json()

      let payload = null

      if (type === ReportType.USER) {
        payload = {
          type: constants.FETCH_ALL_RESPONDED_USER,
          allRespondedUser: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'all',
              respondDate: respondDate ?? 'all',
              penaltyStatus: penalty ?? 'all',
            },
          },
        }
      } else {
        payload = {
          type: constants.FETCH_ALL_RESPONDED_POST,
          allRespondedPost: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'all',
              respondDate: respondDate ?? 'all',
              status: reportStatus ?? 'all',
            },
          },
        }
      }

      dispatch(payload)
    } catch (err) {
      dispatch({
        type: constants.ERROR,
      })
    }
  }
}

export const updateAllResponded = (reportId: string, type: ReportType) => {
  return async (dispatch: any) => {
    dispatch({
      type: constants.LOADING,
    })

    try {
      let payload = null

      if (type === ReportType.POST) {
        payload = {
          type: constants.UPDATE_ALL_RESPONDED_POST,
          reportId: reportId,
        }
      } else {
        payload = {
          type: constants.UPDATE_ALL_RESPONDED_USER,
          reportId: reportId,
        }
      }

      dispatch(payload)
    } catch (err) {
      dispatch({
        type: constants.ERROR,
      })
    }
  }
}
