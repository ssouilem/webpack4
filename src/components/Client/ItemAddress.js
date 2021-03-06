import React from 'react'
import { Modal, Form, Divider, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'

// @TODO DELETE
export const ProductContract = [
  { key: 'fp', text: 'TOTO', value: 'TOTO' },
  { key: 'mp', text: 'TODO', value: 'TODO' },
]

const options = [
  { key: 'm', text: 'Monsieur', value: 'MALE' },
  { key: 'f', text: 'Madame', value: 'FEMALE' },
]

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
      <Form.Group widths='equal'>
        <Form.Field>
          <Form.Dropdown label='Contrat'
            disabled
            required fluid search selection
            name='contract'
            placeholder='choisir un contrat...'
            options={ ProductContract } />
        </Form.Field>
        <Form.Field>
          <Form.Input name='siret'
            disabled={ disabled }
            required onChange={ onChange }
            label='Numéro de SIRET' placeholder='SIRET...'
            value={ address && address.siret }
            error={ address && address.errors && address.errors.siretError } />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field >
          <Form.Input name='email'
            onChange={ onChange }
            label='Email' placeholder='Email...'
            value={ address && address.email } />
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
      </Form.Group>
      <Form.TextArea label='Adresse'
        placeholder='Adresse'
        required
        onChange={ onChange }
        name='address'
        value={ address && address.address }
        error={ address && address.errors && address.errors.addressError } />
      <Form.Input
        placeholder="Complement d'Adresse (Optionnel)"
        label="Complement d'Adresse"
        name='additionalAddress'
        value={ address && address.additionalAddress }
        onChange={ onChange } />
      <Form.Group>
        <Form.Input label='Code postal'
          width={ 4 }
          placeholder='Code postal'
          name='postalCode'
          value={ address && address.postalCode }
          onChange={ onChange }
          error={ address && address.errors && address.errors.postalCodeError } />
        <Form.Input
          placeholder='Ville '
          width={ 12 }
          label='Ville'
          name='city'
          value={ address && address.city }
          onChange={ onChange }
          error={ address && address.errors && address.errors.cityError } />
      </Form.Group>
      <Divider hidden />
      <Header dividing as='h4'>INTERLOCUTEUR</Header>
      <Form.Group >
        <Form.Select name='gender' width={ 4 }
          required onChange={ onChange } fluid label='Gender'
          value={ address && address.gender }
          options={ options } placeholder='Gender' />
        <Form.Field width={ 6 }>
          <Form.Input name='contactFirstName'
            disabled={ disabled }
            required onChange={ onChange }
            label='Nom' placeholder='Last Name...'
            value={ address && address.contactFirstName }
            error={ address && address.errors && address.errors.firstNameError } />
        </Form.Field>
        <Form.Field width={ 6 }>
          <Form.Input name='contactLastName'
            disabled={ disabled }
            required onChange={ onChange }
            label='Prénom' placeholder='Last Name...'
            value={ address && address.contactLastName }
            error={ address && address.errors && address.errors.lastNameError } />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field >
          <Form.Input name='contactMail'
            onChange={ onChange }
            label='Email' placeholder='Email...'
            value={ address && address.contactMail } />
        </Form.Field>
        <Form.Field>
          <Form.Input required
            name='contactMobileNumber'
            onChange={ onChange }
            label='Téléphone mobile'
            placeholder='Téléphone mobile...'
            value={ address && address.contactMobileNumber }
            error={ address && address.errors && address.errors.phoneNumberError } />
        </Form.Field>
      </Form.Group>
    </Form>
  </Modal.Description>
)

ItemAddress.propTypes = {
  address: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default ItemAddress
