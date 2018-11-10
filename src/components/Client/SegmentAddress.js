import React from 'react'
import { Segment, Header, Card, List, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import UpdateAddress from 'COMPONENTS/Client/UpdateAddress'

const SegmentAddress = ({ icon, title, onClick, clients, updateAddress }) => (
  <Segment placeholder>
    <Header as='h4' icon={ icon } content={ title } />
    <div>
      <Card.Content>
        <Card.Header>Sociéte : { clients && clients.client && clients.client && clients.client.name }</Card.Header>
        <Card.Meta>Présenté par : { clients && clients.client && clients.client.contact && clients.client.contact.firstName }</Card.Meta>
        <Card.Description>
          <List>
            <List.Item icon='marker' content={ clients && clients.client && clients.client.address && 'Localisé : ' + clients && clients.client.address } />
            <List.Item icon='city' content={ clients && clients.client && clients.client.city && clients.client.city } />
            <List.Item icon='linkify' content={ clients && clients.client && clients.client.siret && 'N° TVA : ' + clients && clients.client.siret } />
            <List.Item
              icon='mail'
              content={ clients && clients.client && clients.client.contact && clients.client.contact.mail && <a href={ 'mailto:' + clients.client.contact.mail } > { clients.client.contact.mail }</a> }
            />
          </List>
        </Card.Description>
      </Card.Content>
      { (onClick &&
      <Card.Content >
        <UpdateAddress { ...updateAddress } clients={ clients } />
        <Divider hidden />
        <Divider hidden />
      </Card.Content>) ||
      <Card.Content extra>
        <Divider hidden />
        <Divider hidden />
      </Card.Content>
      }
    </div>
  </Segment>
)

const updateAddressPropType = PropTypes.shape({
  onChange: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
})

SegmentAddress.propTypes = {
  updateAddress: updateAddressPropType,
  onClick: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}
export default SegmentAddress
