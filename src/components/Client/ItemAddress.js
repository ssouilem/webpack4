import React from 'react'
import { Modal, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ItemAddress = ({ address, onChange, disabled }) => (
  <Modal.Description>
    <Form error={ address && address.errors && address.errors.formError }>
      <Form.Field>
        <Form.Input name='firstName'
          disabled={ disabled }
          required onChange={ onChange }
          label='First Name' placeholder='First Name...'
          value={ address && address.firstName }
          error={ address && address.errors && address.errors.firstNameError } />
      </Form.Field>
      <Form.Field>
        <Form.Input name='lastName'
          disabled={ disabled }
          required onChange={ onChange }
          label='Last Name' placeholder='Last Name...'
          value={ address && address.lastName }
          error={ address && address.errors && address.errors.lastNameError } />
      </Form.Field>
      <Form.Field >
        <Form.Input name='email'
          required onChange={ onChange }
          label='Email' placeholder='Email...'
          value={ address && address.email }
          error={ address && address.errors && address.errors.emailError } />
      </Form.Field>
      <Form.Field>
        <Form.Input required
          name='phoneNumber'
          onChange={ onChange }
          label='Numéro de telephone'
          placeholder='Numéro de telephone...'
          value={ address && address.phoneNumber }
          error={ address && address.errors && address.errors.phoneNumberError } />
      </Form.Field>
      <Form.Input label='Adresse'
        placeholder='Adresse'
        onChange={ onChange }
        name='address1'
        value={ address && address.address1 }
        error={ address && address.errors && address.errors.address1Error } />
      <Form.Input
        placeholder="Complement d'Adresse"
        label="Complement d'Adresse"
        name='address2'
        value={ address && address.address2 }
        onChange={ onChange }
        error={ address && address.errors && address.errors.address2Error } />
      <Form.Group widths='equal'>
        <Form.Input label='Code postal'
          placeholder='Code postal'
          name='zipCode'
          value={ address && address.zipeCode }
          onChange={ onChange }
          error={ address && address.errors && address.errors.zipCodeError } />
        <Form.Input
          placeholder='Ville '
          label='Ville'
          name='city'
          value={ address && address.city }
          onChange={ onChange }
          error={ address && address.errors && address.errors.cityError } />
      </Form.Group>
    </Form>
  </Modal.Description>
)

ItemAddress.propTypes = {
  address: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default ItemAddress
