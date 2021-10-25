import React from 'react'

const ErrorsContent: React.FC = () => {
  return (
    <div className='card mb-5 mb-xl-8 h-100'>
      <div className='card-body border-0 pt-5'>
        <h1 className='align-items-start flex-column text-center'>
          <span className='card-label fw-bolder fs-3 mb-1'>Server Error</span>
        </h1>
      </div>
    </div>
  )
}

export {ErrorsContent}
