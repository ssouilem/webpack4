import React from 'react'
import { Button, Modal } from 'semantic-ui-react'


class ShowInvoice extends React.Component {
  state = { modalOpen: false, uid: undefined }
  handleOpen = () => {
    this.setState({ modalOpen: true })
    console.log('viewPDF >> ', this.props.invoiceUid)
    if (this.props.invoiceUid) {
      //this.props.generatePdfInvoice({ uid: this.props.invoiceUid })
    }
    this.setState({ modalOpen: true })
  }
  handleClose = () => {
    this.setState({ modalOpen: false })
  }
  render = () => (
    <Modal
      open={ this.state.modalOpen }
      onClose={ this.handleClose }
      trigger={ <Button onClick={ this.handleOpen } icon='dollar sign' floated='right' /> } size='small' centered={ false } closeIcon >
      <Modal.Header>

      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description >
          <embed src='http://localhost:8080/invoice/getpdf/d6e96e30-b9d7-4cc5-a4bc-0d274d06f0b0.pdf' width="680px" height="800px" />
          {/* 'http://localhost:8080/invoice/d6e96e30-b9d7-4cc5-a4bc-0d274d06f0b0/pdfreport'  */ }
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  )
}

export default ShowInvoice
