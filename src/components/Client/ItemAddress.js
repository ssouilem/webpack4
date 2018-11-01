import React from 'react'
import { Modal, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ItemAddress = ({ errors, onChange, disabled, item }) => (
  <Modal.Description>
    <Form error={ errors && errors.formError }>
      <Form.Field>
        <Form.Input name='firstName'
          disabled={ disabled }
          required onChange={ onChange }
          label='First Name' placeholder='First Name...'
          value={ item && item.firstName }
          error={ errors && errors.firstNameError } />
      </Form.Field>
      <Form.Field>
        <Form.Input name='lastName'
          disabled={ disabled }
          required onChange={ onChange }
          label='Last Name' placeholder='Last Name...'
          value={ item && item.lastName }
          error={ errors && errors.lastNameError } />
      </Form.Field>
      <Form.Field >
        <Form.Input name='email'
          required onChange={ onChange }
          label='Email' placeholder='Email...'
          error={ errors && errors.emailError } />
      </Form.Field>
      <Form.Field>
        <Form.Input required
          name='phoneNumber'
          onChange={ onChange }
          label='Numéro de telephone'
          placeholder='Numéro de telephone...'
          error={ errors && errors.phoneNumberError } />
      </Form.Field>
      <Form.Input label='Adresse'
        placeholder='Adresse'
        onChange={ onChange }
        name='address1'
        error={ errors && errors.address1Error } />
      <Form.Input
        placeholder="Complement d'Adresse"
        label="Complement d'Adresse"
        name='address2'
        onChange={ onChange }
        error={ errors && errors.address2Error } />
      <Form.Group widths='equal'>
        <Form.Input label='Code postal'
          placeholder='Code postal'
          name='zipCode'
          onChange={ onChange }
          error={ errors && errors.zipCodeError } />
        <Form.Input
          placeholder='Ville '
          label='Ville'
          name='city'
          onChange={ onChange }
          error={ errors && errors.cityError } />
      </Form.Group>
    </Form>
  </Modal.Description>
)

ItemAddress.propTypes = {
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  item: PropTypes.object,
}

export default ItemAddress
