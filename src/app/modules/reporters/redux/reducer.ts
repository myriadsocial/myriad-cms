import * as Redux from 'redux'
import {ReportType} from '../../../enums'
import {ReporterWithPaginationData} from '../../../interfaces'
import {Actions} from './action'
import * as constants from './constants'

export interface ReporterState {
  reporters: ReporterWithPaginationData
  referenceType: ReportType
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
