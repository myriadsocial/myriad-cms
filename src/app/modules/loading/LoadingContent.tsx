import React from 'react'
import {TableHeader} from '../../interfaces'

type Props = {
  tableHeader: TableHeader
}

const LoadingContent: React.FC<Props> = ({tableHeader}) => {
  const {title, subTitle, field1, field2, field3, field4, field5} = tableHeader

  return (
    <div className='card mb-5 mb-xl-8' style={{overflowY: 'auto', height: '75%'}}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{subTitle} reports</span>
        </h3>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bolder text-muted'>
                <th style={{width: '40%'}} className='rounded-start'>
                  {field1}
                </th>
                <th style={{width: '15%'}}>{field2}</th>
                <th style={{width: '15%'}}>{field3}</th>
                <th style={{width: '15%'}}>{field4}</th>
                <th style={{width: '15%'}} className='rounded-end'>
                  {field5}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>Please wait...</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export {LoadingContent}
