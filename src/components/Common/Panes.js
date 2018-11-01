import React from 'react'
import { Grid, Tab, Menu, Header, Icon, Segment, Button } from 'semantic-ui-react'
import BordereauList from 'COMPONENTS/Bordereau/BordereauList'
import NewBordereau from 'CONTAINERS/Bordereau/NewBordereau'
import Invoice from 'CONTAINERS/Invoices/Invoice'
import { BreadcrumbUtils } from 'COMPONENTS/Utils/Utils'
import SearchSimple from 'CONTAINERS/Search/SearchSimple'

const members = [
  { 'title': 'Vandervort - McCullough', id: 50, 'image': 'https://react.semantic-ui.com//images/avatar/large/matthew.png', avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Souilem', username: 'samir' },
  { 'title': 'Oberbrunner Group', id: 51, 'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg', avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'switch', username: 'test' },
  { 'title': 'Klein Group', id: 55, 'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg', avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Souilem', username: 'samir' },
  { 'title': 'Murazik, Walsh and Ledner', 'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg', id: 52, avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Khaled', username: 'samir' },
  { 'title': 'Pollich - Kris', id: 57, 'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg', avatar_url: 'https://react.semantic-ui.com/images/avatar/large/matthew.png', name: 'Saleh', username: 'ouf' },
]

export const bordereauListPanes = [
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
          <BreadcrumbUtils parent='Bordereaux' child='Liste de bordereaux' />
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
            <BreadcrumbUtils parent='Bordereaux' child='Nouveau bordereau' />
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

export const panes = [
  {
    menuItem: (
      <Menu.Item key='invoices'>
        <Header as='h4'>
          <Icon name='clipboard outline' />
          <Header.Content>Tous les factures</Header.Content>
        </Header>
      </Menu.Item>
    ),
    pane: (
      <Tab.Pane>
        <Grid celled>
          <Grid.Row>
            <BreadcrumbUtils parent='Factures' child='Liste de factures' />
          </Grid.Row>
          <Grid.Row>
            <SearchSimple source={ members } />
          </Grid.Row>
          <Grid.Row centered>
            <BordereauList />
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item key='new invoices'>
        <Header as='h4'>
          <Icon name='edit outline' />
          <Header.Content>Créez une facture</Header.Content>
        </Header>
      </Menu.Item>
    ),
    pane: (
      <Tab.Pane>
        <div>
          <BreadcrumbUtils parent='Factures' child='Nouvelle facture' />
          <Segment vertical>
            <Invoice />
          </Segment>
        </div>
      </Tab.Pane>),
  },
]
