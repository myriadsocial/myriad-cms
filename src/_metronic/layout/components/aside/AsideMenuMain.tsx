/* eslint-disable react/jsx-no-target-blank */
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Management</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/posts'
        title='Manage Post'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/posts/reported' title='List Report Post' hasBullet={true} />
        <AsideMenuItem to='/posts/responded' title='Responded Post' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/users'
        title='Manage User'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/users/reported' title='List Report User' hasBullet={true} />
        <AsideMenuItem to='/users/deleted' title='Deleted User' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
