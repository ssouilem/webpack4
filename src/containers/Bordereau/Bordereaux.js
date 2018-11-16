import React from 'react'
import { Tab, Menu, Header, Icon, Segment, Button } from 'semantic-ui-react'
import BordereauList from 'COMPONENTS/Bordereau/BordereauList'
import NewBordereau from 'CONTAINERS/Bordereau/NewBordereau'
import { BreadcrumbUtils } from 'COMPONENTS/Utils/Utils'
import { connect } from 'react-redux'
import { actions as bordereauActions } from 'ACTIONS/bordereau'

class Bordereaux extends React.Component {
  state = { activeIndex: 1 }
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
  _handleSubmit = () => {
    this.props.createBordereau({
      customer: this.props.bordereau.selectedClient,
      number: this.props.bordereau.bordereauNumber,
      createdAuthor: 'TODO', // @TODO charger la valeur d'auth
      treatmentDate: '2018-10-05', // ajouter un champ de saisie de date
      type: this.props.bordereau.type,
      bordereauDetailList: this.props.bordereau.bordereauDetailList,
    })
  }
  render () {
    const { activeIndex } = this.state

    return (
      <Tab onTabChange={ this.handleTabChange }
        renderActiveOnly={ false }
        panes={
          [
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
                    <Segment vertical>
                      <BreadcrumbUtils parent='Bordereaux' child='Nouveau bordereau' />
                    </Segment>
                    <Segment vertical>
                      <BordereauList />
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
                      <NewBordereau setBordereauDetails={ this.props.setWizardVarsProps } setBordereauProps={ this.props.setWizardProps } />
                    </Segment>
                    <Segment textAlign='right' >
                      <Button disabled color='twitter'>
                        <Icon name='save outline' /> Enregistrer le brouillon
                      </Button>
                      <Button color='twitter' onClick={ this._handleSubmit }>
                        <Icon name='save' /> Enregistrer
                      </Button>
                      <Button color='google plus'>
                        <Icon name='cancel' /> Annuler
                      </Button>
                    </Segment>
                  </div>
                </Tab.Pane>),
            },
          ] } activeIndex={ activeIndex } />
    )
  }
}

const mapStateToProps = state => ({
  bordereau: state.bordereau,
})

const mapDispatchToProps = dispatch => ({
  createBordereau: bordereauActions.createBordereau(dispatch),
  setWizardProps: bordereauActions.setWizardProps(dispatch),
  setWizardVarsProps: bordereauActions.setWizardVarsProps(dispatch),
  dispatch,
})

export { Bordereaux }
export default connect(mapStateToProps, mapDispatchToProps)(Bordereaux)
