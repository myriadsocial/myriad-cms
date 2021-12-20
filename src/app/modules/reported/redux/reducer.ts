import {ReportWithPaginationData} from '../../../interfaces/report.interface'
import * as Redux from 'redux'
import {Actions} from './action'
import * as constants from './constant'

export interface ReportedState {
  reportedPost: ReportWithPaginationData
  reportedUser: ReportWithPaginationData
  loading: boolean
  error: boolean
}

const initialData = {
  data: [],
  meta: {
    totalItemCount: 0,
    totalPageCount: 0,
    itemsPerPage: 0,
  },
  filter: {
    reportDate: 'newest',
    category: 'all',
    postType: 'all',
  },
}

const initialState: ReportedState = {
  reportedPost: initialData,
  reportedUser: initialData,
  loading: true,
  error: false,
}

export const ReportedReducer: Redux.Reducer<ReportedState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.FETCH_ALL_REPORTED_POST: {
      return {
        ...state,
        reportedPost: action.allReportedPost,
        loading: false,
        error: false,
      }
    }

    case constants.FETCH_ALL_REPORTED_USER: {
      return {
        ...state,
        reportedUser: action.allReportedUser,
        loading: false,
        error: false,
      }
    }

    case constants.UPDATE_ALL_REPORTED_POST: {
      return {
        ...state,
        reportedPost: {
          ...state.reportedPost,
          data: state.reportedPost.data.filter((report) => report.id !== action.reportId),
          meta: state.reportedPost.meta,
        },
        loading: false,
        error: false,
      }
    }

    case constants.UPDATE_ALL_REPORTED_USER: {
      return {
        ...state,
        reportedUser: {
          ...state.reportedUser,
          data: state.reportedUser.data.filter((report) => report.id !== action.reportId),
          meta: state.reportedUser.meta,
        },
        loading: false,
        error: false,
      }
    }

    case constants.ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      }
    }

    case constants.LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    default: {
      return state
    }
  }
}
