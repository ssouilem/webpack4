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
  SHOW_INVOICES: 'SHOW_INVOICES',
}

export const DateFormat = 'YYYY/MM/DD'
export const BankOptions = [
  { key: 'BIAT', text: 'BIAT', value: 'BIAT', image: { avatar: true, src: require('STYLES/images/Logo_BIAT_FR.png') } },
  { key: 'ATB', text: 'ATB', value: 'ATB', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
  { key: 'AMENBANK', text: 'AMENBANK', value: 'AMENBANK', image: { avatar: true, src: require('STYLES/images/AMENBANK.jpg') } },
  { key: 'ALBARAKA', text: 'ALBARAKA', value: 'ALBARAKA', image: { avatar: true, src: require('STYLES/images/ALBARAKA.jpg') } },
  { key: 'ATTIJARI', text: 'ATTIJARI', value: 'ATTIJARI', image: { avatar: true, src: require('STYLES/images/ATTIJARI.png') } },
  { key: 'BH', text: 'BH', value: 'BH', image: { avatar: true, src: require('STYLES/images/BH.png') } },
  { key: 'BTE', text: 'BTE', value: 'BTE', image: { avatar: true, src: require('STYLES/images/BTE.png') } },
  { key: 'BNA', text: 'BNA', value: 'BNA', image: { avatar: true, src: require('STYLES/images/BNA.jpg') } },
  { key: 'BTS', text: 'BTS', value: 'BTS', image: { avatar: true, src: require('STYLES/images/BTS.png') } },
  { key: 'BTL', text: 'BTL', value: 'BTL', image: { avatar: true, src: require('STYLES/images/BTL.png') } },
  { key: 'NAIB', text: 'NAIB', value: 'NAIB', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
  { key: 'QNB', text: 'QNB', value: 'QNB', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
  { key: 'STB', text: 'STB', value: 'STB', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
  { key: 'UIB', text: 'UIB', value: 'UIB', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
  { key: 'UBCI', text: 'UBCI', value: 'UBCI', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
  { key: 'STUSID', text: ' STUSID', value: 'STUSID', image: { avatar: true, src: require('STYLES/images/ATB.jpg') } },
]

export const PaiementMode = [
  { key: 'ck', text: 'Chèques', value: 'Chèques', image: { avatar: true, src: require('STYLES/images/cheque.jpg') } },
  { key: 'cv', text: 'Cartes ou Virement', value: 'cartes', image: { avatar: true, src: require('STYLES/images/transac.png') } },
  { key: 'e', text: 'Espèces', value: 'Espèces', image: { avatar: true, src: require('STYLES/images/especes.png') } },
]
