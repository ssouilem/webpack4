import React from 'react'
import { Tab, Menu, Header, Icon, Segment, Button } from 'semantic-ui-react'
import InvoicesList from 'CONTAINERS/Invoices/InvoicesList'
import Invoice from 'CONTAINERS/Invoices/Invoice'
import { BreadcrumbUtils } from 'COMPONENTS/Utils/Utils'

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
        <div>
          <Segment vertical>
            <BreadcrumbUtils parent='Factures' child='Liste de factures' />
          </Segment>
          <Segment vertical>
            <InvoicesList />
          </Segment>
        </div>
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
