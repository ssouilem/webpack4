import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
export const BreadcrumbUtils = ({ parent, child }) => (
  <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right angle' />
    <Breadcrumb.Section link>{ parent }</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right angle' />
    <Breadcrumb.Section active>{ child }</Breadcrumb.Section>
  </Breadcrumb>
)

export const TableType = {
  SHOW_CLIENTS: 'SHOW_CLIENTS',
  SHOW_PRODUCTS: 'SHOW_PRODUCTS',
  SHOW_BORDEREAUX: 'SHOW_BORDEREAUX',
}
