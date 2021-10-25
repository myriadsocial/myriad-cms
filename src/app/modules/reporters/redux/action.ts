import * as constants from './constants'
import {ReporterWithPaginationData} from '../../../interfaces'

export interface LoadReporters {
  type: constants.FETCH_REPORTERS_TYPE
  allReporters: ReporterWithPaginationData
  loading: boolean
}

export interface SetLoading {
  type: constants.LOADING_TYPE
  loading: boolean
}

export type Actions = LoadReporters | SetLoading

export const fetchAllReporters = (reportId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: constants.LOADING,
      })

      // TODO
      const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/${reportId}/users`)
      const data = await response.json()

      dispatch({
        type: constants.FETCH_REPORTERS,
        allReporters: data,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
