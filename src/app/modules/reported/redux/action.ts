import {ReportStatusType, ReportType} from '../../../enums'
import {ReportWithPaginationData} from '../../../interfaces/report.interface'
import * as constants from './constant'
import {config} from '../../../../config'

const {MYRIAD_API_URL, MYRIAD_API_KEY} = config;

export interface LoadAllReportedPost {
  type: constants.FETCH_ALL_REPORTED_POST_TYPE
  allReportedPost: ReportWithPaginationData
  loading: boolean
}

export interface LoadAllReportedUser {
  type: constants.FETCH_ALL_REPORTED_USER_TYPE
  allReportedUser: ReportWithPaginationData
  loading: boolean
}

export interface LoadUpdatedReportedUser {
  type: constants.UPDATE_ALL_REPORTED_USER_TYPE
  reportId: string
  loading: boolean
}

export interface LoadUpdatedReportedPost {
  type: constants.UPDATE_ALL_REPORTED_POST_TYPE
  reportId: string
  loading: boolean
}

export interface SetLoading {
  type: constants.LOADING_TYPE
  loading: boolean
}

export interface SetError {
  type: constants.ERROR_TYPE
  loading: boolean
  error: boolean
}

export type Actions =
  | LoadAllReportedPost
  | LoadAllReportedUser
  | LoadUpdatedReportedUser
  | LoadUpdatedReportedPost
  | SetLoading
  | SetError

export const fetchAllReported = (
  pageNumber = 1,
  type: ReportType,
  reportDate = '',
  category = '',
  postType = ''
) => {
  return async (dispatch: any) => {
    dispatch({
      type: constants.LOADING,
    })

    let newOrder = undefined

    switch (reportDate) {
      case 'newest':
        newOrder = ['createdAt DESC']
        break

      case 'oldest':
        newOrder = ['createdAt ASC']
        break

      default:
        newOrder = ['createdAt DESC']
    }

    try {
      const filter = JSON.stringify({
        where: {
          status: ReportStatusType.PENDING,
          type:
            type === ReportType.USER
              ? undefined
              : category === '' || category === 'all'
              ? undefined
              : category,
          referenceType:
            type === ReportType.USER
              ? ReportType.USER
              : postType === '' || postType === 'all'
              ? {
                  inq: [ReportType.POST, ReportType.COMMENT],
                }
              : postType,
        },
        order: newOrder,
      })

      const url = `${MYRIAD_API_URL}/reports?pageNumber=${pageNumber}&filter=${filter}`

      //TODO: Moved to env
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${MYRIAD_API_KEY}`,
        },
      })
      
      const data = await response.json()
 

      let payload = null

      if (type === ReportType.USER) {
        payload = {
          type: constants.FETCH_ALL_REPORTED_USER,
          allReportedUser: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'newest',
              category: category === '' ? 'all' : category,
            },
          },
        }
      } else {
        payload = {
          type: constants.FETCH_ALL_REPORTED_POST,
          allReportedPost: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'newest',
              category: category === '' ? 'all' : category,
              postType: postType === '' ? 'all' : postType,
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

export const updateAllReported = (reportId: string, type: ReportType, status: ReportStatusType) => {
  return async (dispatch: any) => {
    try {
      let payload = null

      const url = `${MYRIAD_API_URL}/reports/${reportId}`

      await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MYRIAD_API_KEY}`,
        },
        body: JSON.stringify({
          status: status,
          updatedAt: new Date(),
        }),
      })

      if (type === ReportType.POST || type === ReportType.COMMENT) {
        payload = {
          type: constants.UPDATE_ALL_REPORTED_POST,
          reportId: reportId,
        }
      } else {
        payload = {
          type: constants.UPDATE_ALL_REPORTED_USER,
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
