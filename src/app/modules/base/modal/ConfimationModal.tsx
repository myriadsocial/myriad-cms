import React from 'react'
import {Modal, Button} from 'react-bootstrap-v5'
import {ReportType, TableType} from '../../../enums'

type Props = {
  showModal: boolean
  onHide: () => void
  onRemoved: () => void
  tableType: TableType
  type: ReportType
}

const ConfirmationModal: React.FC<Props> = ({showModal, onHide, onRemoved, tableType, type}) => {
  const tableTypeText = tableType === TableType.REPORTED ? 'remove' : 'restore'
  const typeText = type === ReportType.POST ? 'post' : 'user'
  return (
    <Modal show={showModal} onHide={onHide} backdrop='static' keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are going to {tableTypeText} this {typeText} from Myriad, please make sure you choosing
        the right post
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant='info'
          onClick={onRemoved}
          data-bs-toggle='modal'
          data-bs-target='#kt_modal_report_action'
          data-bs-dismiss='modal'
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export {ConfirmationModal}
