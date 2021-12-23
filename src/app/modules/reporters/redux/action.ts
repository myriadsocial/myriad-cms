import * as constants from './constants'
import {ReporterWithPaginationData} from '../../../interfaces'
import {ReportType} from '../../../enums'
import {config} from '../../../../config'

const {MYRIAD_API_URL, MYRIAD_API_KEY} = config;

export interface LoadReporters {
  type: constants.FETCH_REPORTERS_TYPE
  allReporters: ReporterWithPaginationData
  referenceType: ReportType
  referenceId: string
  reportId: string
  loading: boolean
}

export interface SetLoading {
  type: constants.LOADING_TYPE
  loading: boolean
}

export type Actions = LoadReporters | SetLoading

export const fetchAllReporters = (reportId: string, type?: ReportType, referenceId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: constants.LOADING,
      })

      const url = `${MYRIAD_API_URL}/reports/${reportId}/users`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${MYRIAD_API_KEY}`,
        },
      })
      const data = await response.json()

      dispatch({
        type: constants.FETCH_REPORTERS,
        allReporters: data,
        referenceType: type,
        referenceId: referenceId,
        reportId: reportId,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
