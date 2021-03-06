import {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../app/modules/loading/FallbackView'
import {ReportType} from '../enums'

export function PrivateRoutes() {
  const ReportedPostPage = lazy(() => import('../pages/ReportedPage'))
  const ReportedUserPage = lazy(() => import('../pages/ReportedPage'))
  const RespondedPostPage = lazy(() => import('../pages/RespondedPage'))
  const RespondedUserPage = lazy(() => import('../pages/RespondedPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
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
        <Redirect from='/auth' to='/posts/reported' />
        <Redirect exact from='/' to='/posts/reported' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
