import {ReportStatusType, ReportType} from '../../../enums'
import {ReportWithPaginationData} from '../../../interfaces'
import * as constants from './constant'
import {config} from '../../../../config'

const {MYRIAD_API_URL, MYRIAD_API_KEY} = config;
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
  status = '',
  postType = ''
) => {
  return async (dispatch: any) => {
    dispatch({
      type: constants.LOADING,
    })

    let newOrder = undefined

    if (!reportDate || !respondDate) {
      newOrder = ['updatedAt DESC']
    }

    if (reportDate === 'newest') {
      newOrder = ['createdAt DESC']
    }

    if (reportDate === 'oldest') {
      newOrder = ['createdAt ASC']
    }

    if (respondDate === 'newest') {
      newOrder = ['updatedAt DESC']
    }

    if (respondDate === 'oldest') {
      newOrder = ['updatedAt ASC']
    }

    try {
      const filter = JSON.stringify({
        where: {
          status:
            status === '' || status === 'all'
              ? {
                  inq: [ReportStatusType.IGNORED, ReportStatusType.REMOVED],
                }
              : status,
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

      //TODO: Moved to env
      const url = `${MYRIAD_API_URL}/reports?pageNumber=${pageNumber}&filter=${filter}`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${MYRIAD_API_KEY}`,
        },
      })
      const data = await response.json()

      let payload = null

      if (type === ReportType.USER) {
        payload = {
          type: constants.FETCH_ALL_RESPONDED_USER,
          allRespondedUser: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'newest',
              respondDate: respondDate ?? 'newest',
              status: status === '' ? 'all' : status,
            },
          },
        }
      } else {
        payload = {
          type: constants.FETCH_ALL_RESPONDED_POST,
          allRespondedPost: {
            ...data,
            filter: {
              reportDate: reportDate ?? 'newest',
              respondDate: respondDate ?? 'newest',
              status: status === '' ? 'all' : status,
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

export const updateAllResponded = (reportId: string, type: ReportType) => {
  return async (dispatch: any) => {
    try {
      let payload = null

      const url = `${MYRIAD_API_URL}/reports/${reportId}`

      await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${MYRIAD_API_KEY}`,
        },
      })

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
