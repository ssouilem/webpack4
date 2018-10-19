import React from 'react'
import { Header, Icon, Label, Menu, Tab, Grid, Form, Button, Divider, Breadcrumb, Segment } from 'semantic-ui-react'
import Campany from 'CONTAINERS/Campany/Campany'
import SearchSimple from 'COMPONENTS/Search/SearchSimple'
import AddBordereau from 'COMPONENTS/Bordereau/AddBordereau'

const source = [
  {
    "title": "Pollich - Kris",
    "description": "Digitized intangible architecture",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/kylefrost/128.jpg",
    "price": "$23.90"
  },
  {
    "title": "Murazik, Walsh and Ledner",
    "description": "Assimilated exuding leverage",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/danvierich/128.jpg",
    "price": "$10.90"
  },
  {
    "title": "Klein Group",
    "description": "Expanded holistic artificial intelligence",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/haydn_woods/128.jpg",
    "price": "$80.42"
  },
  {
    "title": "Oberbrunner Group",
    "description": "Sharable zero defect secured line",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg",
    "price": "$39.81"
  },
  {
    "title": "Vandervort - McCullough",
    "description": "Triple-buffered explicit system engine",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg",
    "price": "$3.88"
  }
]

const members = [
    { "title": "Vandervort - McCullough", id: 50, "image": 'https://react.semantic-ui.com//images/avatar/large/matthew.png', avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Souilem', username:'samir' },
    { "title": "Oberbrunner Group", id: 51, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg", avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'switch', username:'test' },
    { "title": "Klein Group", id: 55, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg", avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Souilem', username:'samir' },
    { "title": "Murazik, Walsh and Ledner", "image": "https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg", id: 52, avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Khaled', username:'samir' },
    { "title": "Pollich - Kris", id: 57, "image": "https://s3.amazonaws.com/uifaces/faces/twitter/akmur/128.jpg", avatar_url: 'https://react.semantic-ui.com/images/avatar/large/matthew.png', name: 'Saleh', username:'ouf' }
]

const HeaderUsersIcon = () => (
  <div>
    <Header as='h1' icon textAlign='center'>
      <Icon name='users' circular />
      <Header.Content >Liste des societes</Header.Content>
    </Header>
  </div>
)

const HeaderNewInvoiceIcon = () => (
  <Header as='h2'>
    <Icon name='edit outline' />
    <Header.Content>Créez une facture</Header.Content>
  </Header>
)

const HeaderListInvoiceIcon = () => (
  <Header as='h2'>
    <Icon name='clipboard outline' />
    <Header.Content>Mes Factures</Header.Content>
  </Header>
)

const BreadcrumbInvoice = () => (
  <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right angle' />
    <Breadcrumb.Section link>Factures</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right angle' />
    <Breadcrumb.Section active>Nouvelle facture</Breadcrumb.Section>
  </Breadcrumb>
)

const panes = [
  {
    menuItem: (
      <Menu.Item key='invoices'>
        <HeaderListInvoiceIcon />
      </Menu.Item>
    ),
    render: () =>
    <Tab.Pane>
      <HeaderUsersIcon />
      <Grid container  >
        <Grid.Row>
          <SearchSimple source= { members } />
        </Grid.Row>
        <Grid.Row centered>
          <Campany />
        </Grid.Row>
      </Grid>
    </Tab.Pane>,
  },
  {
    menuItem: (
      <Menu.Item key='new invoices'>
        <HeaderNewInvoiceIcon />
      </Menu.Item>
    ),
    render: () =>
    <Tab.Pane>
    <div>
      <Segment vertical>
          <BreadcrumbInvoice />
        </Segment>
        <Segment vertical>
          <AddBordereau />
        </Segment>
      </div>
    </Tab.Pane>,
  },
]

const TabExampleCustomMenuItem = () => <Tab panes={panes} />

export default TabExampleCustomMenuItem
