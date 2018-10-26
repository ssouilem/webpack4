import React from 'react'
import { Tab, Menu, Header, Icon, Segment, Breadcrumb, Button } from 'semantic-ui-react'
import BordereauList from 'COMPONENTS/Bordereau/BordereauList'
import NewBordereau from 'CONTAINERS/Bordereau/NewBordereau'

const Panes = [
  {
    menuItem: (
      <Menu.Item key='invoices'>
        <Header as='h4'>
          <Icon name='clipboard outline' />
          <Header.Content>Tous les Bordereaux</Header.Content>
        </Header>
      </Menu.Item>
    ),
    pane: (
      <Tab.Pane>
        <div>
          <Breadcrumb>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section link>Bordereaux</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section active>Liste de bordereaux</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        <Segment vertical placeholder>
          <BordereauList />
        </Segment>
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item key='new invoices'>
        <Header as='h4'>
          <Icon name='edit outline' />
          <Header.Content>Créez un bordereau</Header.Content>
        </Header>
      </Menu.Item>
    ),
    pane: (
      <Tab.Pane>
        <div>
          <Segment vertical>
            <Breadcrumb>
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section link>Bordereaux</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section active>Nouveau bordereau</Breadcrumb.Section>
            </Breadcrumb>
          </Segment>
          <Segment vertical>
            <NewBordereau />
          </Segment>
          <Segment textAlign='right' >
            <Button disabled color='twitter'>
              <Icon name='save outline' /> Enregistrer le brouillon
            </Button>
            <Button color='twitter'>
              <Icon name='save' /> Enregistrer
            </Button>
            <Button color='google plus'>
              <Icon name='cancel' /> Annuler
            </Button>
          </Segment>
        </div>
      </Tab.Pane>),
  },
]

export default Panes
