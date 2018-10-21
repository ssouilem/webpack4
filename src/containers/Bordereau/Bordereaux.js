import React from 'react'
import { Tab, Menu, Header, Icon, Segment, Breadcrumb } from 'semantic-ui-react'
import BordereauList from 'COMPONENTS/Bordereau/BordereauList'
import AddBordereau from 'COMPONENTS/Bordereau/AddBordereau'

const BreadcrumbBL = () => (
  <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right angle' />
    <Breadcrumb.Section link>Bordereaux</Breadcrumb.Section>
    <Breadcrumb.Divider icon='right angle' />
    <Breadcrumb.Section active>Nouveau bordereau</Breadcrumb.Section>
  </Breadcrumb>
)

const HeaderNewBL = () => (
  <Header as='h4'>
    <Icon name='edit outline' />
    <Header.Content>Créez un bordereau</Header.Content>
  </Header>
)

const HeaderAllBL = () => (
  <Header as='h4'>
    <Icon name='clipboard outline' />
    <Header.Content>Tous les Bordereaux</Header.Content>
  </Header>
)

const panes = [
  {
    menuItem: (
      <Menu.Item key='invoices'>
        <HeaderAllBL />
      </Menu.Item>
    ),
    render: () =>
    <Tab.Pane>
      <BordereauList />
    </Tab.Pane>,
  },
  {
    menuItem: (
      <Menu.Item key='new invoices'>
        <HeaderNewBL />
      </Menu.Item>
    ),
    render: () =>
    <Tab.Pane>
      <div>
        <Segment vertical>
          <BreadcrumbBL />
        </Segment>
        <Segment vertical>
          <AddBordereau />
        </Segment>
      </div>
    </Tab.Pane>,
  },
]

class TabBLItem extends React.Component {
  state = { activeIndex: 1 }
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render () {
    const { activeIndex } = this.state

    return (
      <Tab panes={ panes } activeIndex={ activeIndex }
        onTabChange={ this.handleTabChange } />
    )
  }
}

const mapStateToProps = ({ search }) => ({ search })

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export default TabBLItem
