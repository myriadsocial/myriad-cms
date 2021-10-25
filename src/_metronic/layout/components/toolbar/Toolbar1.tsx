/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React from 'react'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: React.FC = () => {
  const {classes} = useLayout()

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className='d-flex align-items-center py-1'>
          <div className='card-toolbar'>
            <ul className='nav'>
              <li className='nav-item'>
                <a
                  className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bolder px-4 me-1'
                  data-bs-toggle='tab'
                  href='#kt_table_widget_5_tab_1'
                >
                  Today
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4 me-1'
                  data-bs-toggle='tab'
                  href='#kt_table_widget_5_tab_2'
                >
                  Month
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                  data-bs-toggle='tab'
                  href='#kt_table_widget_5_tab_3'
                >
                  Year
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
