import {ReportStatusType, ReportType} from '../../../enums'
import {ReportWithPaginationData} from '../../../interfaces/report.interface'
import * as constants from './constant'

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
    let reportType = undefined
    let postTy = undefined

    switch (reportDate) {
      case 'newest':
        newOrder = ['createdAt DESC'];
        break;

      case 'oldest': 
        newOrder = ['createdAt ASC'];
        break;

      default:
        newOrder = ['createdAt DESC'];
    }

    if (type === ReportType.POST) {
      reportType = category === '' || category === 'all' ? undefined : category
      postTy = postType === '' || postType === 'all' ? undefined : postType
    }


    try {
      const filter = {
        where: {
          status: ReportStatusType.PENDING,
          type: reportType,
        },
        order: newOrder,
      }

      if (type === ReportType.COMMENT || type === ReportType.POST) {
        filter.where = Object.assign(filter.where, {
          referenceType: postTy,
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
          type: constants.FETCH_ALL_REPORTED_USER,
          allReportedUser: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'all',
              category: reportType,
            },
          },
        }
      } else {
        payload = {
          type: constants.FETCH_ALL_REPORTED_POST,
          allReportedPost: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'all',
              category: category ?? 'all',
              postType: postTy ?? 'all',
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

export const updateAllReported = (reportId: string, type: ReportType) => {
  return async (dispatch: any) => {
    dispatch({
      type: constants.LOADING,
    })

    try {
      let payload = null

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

export const filterAllReported = (reportId: string, type: ReportType) => {
  return async (dispatch: any) => {
    dispatch({
      type: constants.LOADING,
    })

    try {
      let payload = null

      if (type === ReportType.POST) {
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
