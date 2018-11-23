/* jshint esversion: 6 */
import React, { Component } from 'react'
import { Form, Select } from 'semantic-ui-react'

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class Entreprise extends Component {
  state = { name: '', email: '', submittedName: '', submittedEmail: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email } = this.state

    this.setState({ submittedName: name, submittedEmail: email })
  }

  render () {
    const { name, email, contactPhone, contactMail, siret, tva, address1, address2, codePostal, city, submittedName, submittedEmail, firstName, lastName } = this.state

    return (
      <div>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Group widths='equal'>
            <Form.Input label="Nom de l'entreprise"
              placeholder="Nom de l'entreprise" name='name'
              value={ name }
              onChange={ this.handleChange }
            />
            <Form.Input
              placeholder='Email'
              label='Email de contact'
              name='email'
              value={ email }
              onChange={ this.handleChange }
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Numéro de SIRET'
              placeholder='Numéro de SIRET'
              name='siret'
              value={ siret }
              onChange={ this.handleChange } />
            <Form.Input
              placeholder='Numéro de TVA'
              label='Numéro de TVA'
              name='siret'
              value={ siret }
              onChange={ this.handleChange }
            />
            <Form.Input
              placeholder='TVA par défaut'
              label='TVA par défaut'
              name='tva'
              value={ tva }
              onChange={ this.handleChange }
            />
          </Form.Group>

          Adresse de facturation
          <Form.Group widths='equal'>
            <Form.Input label='Adresse'
              placeholder='Adresse'
              name='address1'
              value={ address1 }
              onChange={ this.handleChange } />
            <Form.Input
              placeholder="Complement d'Adresse"
              label="Complement d'Adresse"
              name='address2'
              value={ address2 }
              onChange={ this.handleChange }
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Code postal'
              placeholder='Code postal'
              name='codePostal'
              value={ codePostal }
              onChange={ this.handleChange } />
            <Form.Input
              placeholder='Ville'
              label='Ville'
              name='city'
              value={ city }
              onChange={ this.handleChange }
            />
          </Form.Group>
          INTERLOCUTEUR
          <Form.Group widths='equal'>
            <Form.Field
              control={ Select }
              options={ genderOptions }
              label={ { children: 'Gender', htmlFor: 'form-select-control-gender' } }
              placeholder='Gender'
              search
              searchInput={ { id: 'form-select-control-gender' } }
            />
            <Form.Field label='Prénom'
              control='input'
              name='firstName'
              value={ firstName }
              placeholder='Prénom' />
            <Form.Field label='Nom de famille'
              control='input'
              name='lastName'
              value={ lastName }
              placeholder='Nom de famille' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field label='E-mail'
              control='input'
              name='contactMail'
              value={ contactMail }
              placeholder='E-mail' />
            <Form.Field label='Portable'
              control='input'
              name='contactPhone'
              value={ contactPhone }
              placeholder='Portable' />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, email }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
      </div>
    )
  }
}

export default Entreprise
