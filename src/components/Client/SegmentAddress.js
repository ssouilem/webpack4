import React from 'react'
import { Segment, Header, Card, List, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import UpdateAddress from 'COMPONENTS/Client/UpdateAddress'

const SegmentAddress = ({ icon, title, onClick, client, updateAddress }) => (
  <Segment placeholder>
    <Header as='h4' icon={ icon } content={ title } />
    <div>
      <Card.Content>
        <Card.Header>Sociéte : { client.name && client.name }</Card.Header>
        <Card.Meta>Présenté par : { client.contact && client.contact.firstName }</Card.Meta>
        <Card.Description>
          <List>
            <List.Item icon='marker' content={ client.address && 'Localisé : ' + client.address } />
            <List.Item icon='city' content={ client.city && client.city } />
            <List.Item icon='linkify' content={ client.siret && 'N° TVA : ' + client.siret } />
            <List.Item
              icon='mail'
              content={ <a href={ client.contact && 'mailto:' + client.contact.mail } >{ client.contact && client.contact.mail }</a> }
            />
          </List>
        </Card.Description>
      </Card.Content>
      { (onClick &&
      <Card.Content >
        <UpdateAddress { ...updateAddress } item={ client }/>
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
  handleOpen: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
  errors: PropTypes.object,
})

SegmentAddress.propTypes = {
  updateAddress: updateAddressPropType,
  onClick: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}
export default SegmentAddress
