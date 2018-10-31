import React, {Component} from 'react'
import { Form, Button, Divider, Table, Card, Image, Icon, Header, Checkbox, Label, Segment, Grid } from 'semantic-ui-react'
import AddBordereauDetail from 'COMPONENTS/Bordereau/AddBordereauDetail'

const invoices = []
const IconExampleTwitterGroup = (props) => (
  <div>
    <Checkbox label={{ children: (props === 'RETOUR') ? 'Bordereau de retour' : 'Bordereau de livraison'}} />
    <Header as='h2'>
    { (props === 'RETOUR') &&  <Icon.Group size='big' >
      <Icon  name='file' />
      <Icon corner fitted name='reply all' />
    </Icon.Group>
    }
    { !(props === 'RETOUR') && <Icon.Group size='big'>
      <Icon color='teal' name='file outline' />
      <Icon corner name='sign-out alternate' />
    </Icon.Group>
    }
      {props}
    </Header>
  </div>
)

class AddBordereau extends React.Component {
  constructor(props) {
   super(props);
   // Don't do this!
   this.state = { color: props.color , invoices: [] };
  }
  componentWillMount() {
    console.log('add Bordereau');
    this.addLineInvoice = this.addLineInvoice.bind(this)
  }
  addLineInvoice = () => {
      console.log('addLineInvoice');
      //create a unike key for each new fruit item
       var timestamp = (new Date()).getTime();
       let invoice = 'ID_'+ timestamp;
       console.log(invoice);
      this.setState(prevState => ({
        invoices: [...prevState.invoices, invoice]
      }))
       console.log(this.state.invoices);
  }

  render() {
    return (
      <div>
        <Segment vertical>

          <Form widths='equal'>
              <Label as='a' color='teal' image >
                Bordereau
                <Label.Detail><Icon name='angle double right' /> Type</Label.Detail>
              </Label>
              <Divider />
              <Card.Group>
                <Card link header={ IconExampleTwitterGroup('LIVRAISON') } color='green'/>
                <Card link header={ IconExampleTwitterGroup('RETOUR') } color='red'/>
              </Card.Group>

              <Divider hidden />
              <Label as='a' color='blue' image >
                Bordereau
                <Label.Detail><Icon name='angle double right' /> Information</Label.Detail>
              </Label>
              <Divider />
              <Segment >
                <Form.Group widths='equal'>
                  <Form.Input label='Nom de la societe' fluid icon='user' iconPosition='left' placeholder='Nom de la societe' />
                  <Form.Input
                    label='Reference'
                    fluid
                    icon='tag'
                    iconPosition='left'
                    placeholder='Reference'/>
                    <Form.Input icon='calendar alternate outline' fluid label='Date de traitement' placeholder='01/01/2018' />
                  </Form.Group>
              </Segment>
              <Label as='a' color='yellow' image >
                Bordereau
                <Label.Detail><Icon name='angle double right' /> Details</Label.Detail>
              </Label>
              <Divider />
              <AddBordereauDetail addLineInvoice={this.addLineInvoice}/>

              {this.state.invoices.map(invoice => (
                <AddBordereauDetail addLineInvoice={this.addLineInvoice}/>
              ))}

              <Divider hidden />
              <Segment vertical textAlign='right' >
                  <Button  disabled color='twitter'>
                     <Icon name='save outline' /> Enregistrer le brouillon
                   </Button>
                   <Button  color='twitter'>
                     <Icon name='save' /> Enregistrer
                   </Button>
                   <Button  color='google plus'>
                     <Icon name='cancel' /> Annuler
                   </Button>
              </Segment>

            </Form>
            </Segment>
        </div>
    )
  }
}
export default AddBordereau
