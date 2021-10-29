import React from 'react'
import {Modal, InputGroup, FormControl, Form, Button} from 'react-bootstrap-v5'

type Props = {
  showModal: boolean
  onHide: () => void
  confirmModal: () => void
  description?: string
  penalty?: string
}

const ActionUserModal: React.FC<Props> = (props) => {
  const {showModal, onHide, confirmModal, description, penalty} = props
  return (
    <Modal show={showModal} onHide={onHide} keyboard={false} centered>
      <Modal.Header>
        <Modal.Title className='font-weight-normal'>
          <h4 className='mb-2'>Action to user</h4>
          <span className='text-muted fs-7' style={{fontWeight: 'normal'}}>
            please check user penalty level before take action
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Label>Penalty</Form.Label>
        <InputGroup className='mb-3'>
          <FormControl
            placeholder={penalty}
            aria-label='Penalty'
            aria-describedby='basic-addon1'
            readOnly
          />
        </InputGroup>
        <Form.Label>Reason</Form.Label>
        <InputGroup className='mb-3'>
          <FormControl
            as='textarea'
            placeholder={description}
            aria-label='reason'
            aria-describedby='basic-addon1'
            readOnly
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='info' onClick={confirmModal}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export {ActionUserModal}
