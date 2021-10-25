/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLayout} from '../../core'
import {AsideMenu} from './AsideMenu'

const AsideDefault: React.FC = () => {
  const {classes} = useLayout()

  return (
    <div className={clsx('aside', classes.aside.join(' '))}>
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
        <Link to='/dashboard'>
          <h1 className='text-light'>Myriad CMS</h1>
        </Link>
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}
    </div>
  )
}

export {AsideDefault}
