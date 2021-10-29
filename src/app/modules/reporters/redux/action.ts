import * as constants from './constants'
import {ReporterWithPaginationData} from '../../../interfaces'
import {ReportType} from '../../../enums'

export interface LoadReporters {
  type: constants.FETCH_REPORTERS_TYPE
  allReporters: ReporterWithPaginationData
  referenceType: ReportType
  loading: boolean
}

export interface SetLoading {
  type: constants.LOADING_TYPE
  loading: boolean
}

export type Actions = LoadReporters | SetLoading

export const fetchAllReporters = (reportId: string, type?: ReportType) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: constants.LOADING,
      })

      const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/${reportId}/users`)
      const data = await response.json()

      dispatch({
        type: constants.FETCH_REPORTERS,
        allReporters: data,
        referenceType: type,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
