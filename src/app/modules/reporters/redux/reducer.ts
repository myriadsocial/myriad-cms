import * as Redux from 'redux'
import {ReportType} from '../../../enums'
import {ReporterWithPaginationData} from '../../../interfaces'
import {Actions} from './action'
import * as constants from './constants'

export interface ReporterState {
  reporters: ReporterWithPaginationData
  referenceType: ReportType
  referenceId: string
  reportId: string
  loading: boolean
}

const initialData = {
  data: [],
  meta: {
    totalItemCount: 0,
    totalPageCount: 0,
    itemsPerPage: 0,
  },
}

const initialState: ReporterState = {
  reporters: initialData,
  referenceType: ReportType.USER,
  referenceId: '',
  reportId: '',
  loading: true,
}

export const ReportersReducer: Redux.Reducer<ReporterState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.FETCH_REPORTERS: {
      return {
        ...state,
        reporters: action.allReporters,
        referenceType: action.referenceType,
        referenceId: action.referenceId,
        reportId: action.reportId,
        loading: false,
      }
    }

    case constants.LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    default:
      return state
  }
}
