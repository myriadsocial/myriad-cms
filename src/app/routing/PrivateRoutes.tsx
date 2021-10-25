import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {ReportType} from '../enums'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'

export function PrivateRoutes() {
  const ReportedPostPage = lazy(() => import('../modules/reported/ReportedPage'))
  const ReportedUserPage = lazy(() => import('../modules/reported/ReportedPage'))
  const RespondedPostPage = lazy(() => import('../modules/responded/RespondedPage'))
  const RespondedUserPage = lazy(() => import('../modules/responded/RespondedPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/posts/reported'>
          <ReportedPostPage type={ReportType.POST} />
        </Route>
        <Route path='/users/reported'>
          <ReportedUserPage type={ReportType.USER} />
        </Route>
        <Route path='/posts/responded'>
          <RespondedPostPage type={ReportType.POST} />
        </Route>
        <Route path='/users/deleted'>
          <RespondedUserPage type={ReportType.USER} />
        </Route>
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
