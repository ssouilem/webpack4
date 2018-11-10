import React from 'react'
import { Modal, Button, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ItemAddress from 'COMPONENTS/Client/ItemAddress'

const UpdateAddress = ({ onChange, complete, submitMeetingForm, clients }) => (
  <Modal
    trigger={ <Button basic icon='pencil alternate' content='Modifier' floated='right' /> }
    centered={ false }
    size='small'
  >
    <Modal.Header content="Modifier l'adresse de client" />
    <Modal.Content scrolling>
      { !complete
        ? <ItemAddress
          address={ clients }
          onChange={ onChange }
          disabled={ false }
        />
        : <div className='modal-complete'>
          <Image src='/images/check.png' />
          <p>Thanks for scheduling a meeting,  We've received your information and we'll be in touch shortly.</p>
        </div>
      }
    </Modal.Content>
    { !complete
      ? <Modal.Actions>
        <Button color='red'>Close</Button>
        <Button positive icon='checkmark'
          labelPosition='right' content='Submit'
          onClick={ submitMeetingForm } />
      </Modal.Actions>
      : null }
  </Modal>

)

UpdateAddress.propTypes = {
  onChange: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired,
}
export default UpdateAddress
