import React from 'react'
import {Modal, Button} from 'react-bootstrap-v5'
import {ReportType, TableType} from '../../../enums'

type Props = {
  showModal: boolean
  tableType: TableType
  type: ReportType
  onHide: () => void
  onRemoved: () => void
}

const ConfirmationModal: React.FC<Props> = ({showModal, onHide, onRemoved, tableType, type}) => {
  const tableTypeText = tableType === TableType.REPORTED ? 'remove' : 'restore'

  return (
    <Modal show={showModal} onHide={onHide} backdrop='static' keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are going to {tableTypeText} this {type} from Myriad, please make sure you choosing the
        right {type}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant='info'
          onClick={onRemoved}
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export {ConfirmationModal}
