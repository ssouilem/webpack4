import React from 'react'
import { Modal, Form, Divider, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ItemAddress = ({ address, onChange, disabled }) => (
  <Modal.Description>
    <Form error={ address && address.errors && address.errors.formError }>
      <Form.Field>
        <Form.Input name='companyName'
          disabled={ disabled }
          required onChange={ onChange }
          label='Société' placeholder='Société...'
          value={ address && address.companyName }
          error={ address && address.errors && address.errors.companyNameError } />
      </Form.Field>
      <Form.Field>
        <Form.Input name='siret'
          disabled={ disabled }
          required onChange={ onChange }
          label='Numéro de SIRET' placeholder='SIRET...'
          value={ address && address.siret }
          error={ address && address.errors && address.errors.siretError } />
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
          label='Téléphone fixe'
          placeholder='Téléphone fixe...'
          value={ address && address.phoneNumber }
          error={ address && address.errors && address.errors.phoneNumberError } />
      </Form.Field>
      <Form.TextArea label='Adresse'
        placeholder='Adresse'
        required
        onChange={ onChange }
        name='address1'
        value={ address && address.address1 }
        error={ address && address.errors && address.errors.address1Error } />
      <Form.Input
        placeholder="Complement d'Adresse (Optionnel)"
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
      <Divider hidden />
      <Header dividing as='h4'>INTERLOCUTEUR</Header>
      <Form.Field>
        <Form.Input name='contactFirstName'
          disabled={ disabled }
          required onChange={ onChange }
          label='Nom' placeholder='Last Name...'
          value={ address && address.firsttName }
          error={ address && address.errors && address.errors.firstNameError } />
      </Form.Field>
      <Form.Field>
        <Form.Input name='contactLastName'
          disabled={ disabled }
          required onChange={ onChange }
          label='Prénom' placeholder='Last Name...'
          value={ address && address.lastName }
          error={ address && address.errors && address.errors.lastNameError } />
      </Form.Field>
      <Form.Field >
        <Form.Input name='contactMail'
          required onChange={ onChange }
          label='Email' placeholder='Email...'
          value={ address && address.email }
          error={ address && address.errors && address.errors.emailError } />
      </Form.Field>
      <Form.Field>
        <Form.Input required
          name='contactMobileNumber'
          onChange={ onChange }
          label='Téléphone mobile'
          placeholder='Téléphone mobile...'
          value={ address && address.phoneNumber }
          error={ address && address.errors && address.errors.phoneNumberError } />
      </Form.Field>
    </Form>
  </Modal.Description>
)

ItemAddress.propTypes = {
  address: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default ItemAddress
