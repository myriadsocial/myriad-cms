import {ReportWithPaginationData} from '../../../interfaces/report.interface'
import * as Redux from 'redux'
import {Actions} from './action'
import * as constants from './constant'

export interface RespondedState {
  respondedPost: ReportWithPaginationData
  respondedUser: ReportWithPaginationData
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
    respondDate: 'newest',
    postType: 'all',
    status: 'all',
  },
}

const initialState: RespondedState = {
  respondedPost: initialData,
  respondedUser: initialData,
  loading: true,
  error: false,
}

export const RespondedReducer: Redux.Reducer<RespondedState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.FETCH_ALL_RESPONDED_POST: {
      return {
        ...state,
        respondedPost: action.allRespondedPost,
        loading: false,
        error: false,
      }
    }

    case constants.FETCH_ALL_RESPONDED_USER: {
      return {
        ...state,
        respondedUser: action.allRespondedUser,
        loading: false,
        error: false,
      }
    }

    case constants.UPDATE_ALL_RESPONDED_POST: {
      return {
        ...state,
        respondedPost: {
          ...state.respondedPost,
          data: state.respondedPost.data.filter((report) => report.id !== action.reportId),
          meta: state.respondedPost.meta,
        },
        loading: false,
        error: false,
      }
    }

    case constants.UPDATE_ALL_RESPONDED_USER: {
      return {
        ...state,
        respondedUser: {
          ...state.respondedUser,
          data: state.respondedUser.data.filter((report) => report.id !== action.reportId),
          meta: state.respondedUser.meta,
        },
        loading: false,
        error: false,
      }
    }

    case constants.LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case constants.ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      }
    }

    default: {
      return state
    }
  }
}
