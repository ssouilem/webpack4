import React from 'react'
import { Modal, Button, Image, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const UpdateAddress = ({ onChange, handleOpen, modalOpen, handleClose, complete, submitMeetingForm, errors }) => (
  <Modal
    trigger={ <Button onClick={ handleOpen }
      basic icon='pencil alternate' content='Modifier' floated='right' /> }
    open={ modalOpen }
    onClose={ handleClose }
    size='small'
    closeIcon
  >
    <Modal.Header >Modifier l'adresse de client</Modal.Header>
    <Modal.Content>
      { !complete ?
        <Modal.Description>
          <Form error={ errors.formError && errors.formError }>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input name='firstName'
                  required onChange={ onChange }
                  label='First Name' placeholder='First Name...'
                  error={ errors.firstNameError } />
              </Form.Field>
              <Form.Field>
                <Form.Input name='lastName'
                  required onChange={ onChange }
                  label='Last Name' placeholder='Last Name...'
                  error={ errors.lastNameError } />
              </Form.Field>
            </Form.Group>
            <Form.Field >
              <Form.Input name='email'
                required onChange={ onChange }
                label='Email' placeholder='Email...'
                error={ errors.emailError } />
            </Form.Field>
            <Form.Field>
              <Form.Input required
                name='location'
                onChange={ onChange }
                label='Location'
                placeholder='City, State/Province, Country...'
                error={ errors.locationError } />
            </Form.Field>
          </Form>
        </Modal.Description>
        :
        <div className='modal-complete'>
          <Image src='/images/check.png' />
          <p>Thanks for scheduling a meeting,  We've received your information and we'll be in touch shortly.</p>
        </div>
      }
    </Modal.Content>
    { !complete ?
      <Modal.Actions>
        <Button color='red' onClick={ handleClose }>Close</Button>
        <Button positive icon='checkmark'
          labelPosition='right' content='Submit'
          onClick={ submitMeetingForm } />
      </Modal.Actions>
      : null }
  </Modal>

)

UpdateAddress.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}
export default UpdateAddress
