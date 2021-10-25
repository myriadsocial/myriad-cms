import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import {ReportedReducer} from '../../app/modules/reported/redux/reducer'
import {ReportersReducer} from '../../app/modules/reporters/redux/reducer'
import {RespondedReducer} from '../../app/modules/responded/redux/reducer'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  reported: ReportedReducer,
  reporters: ReportersReducer,
  responded: RespondedReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
