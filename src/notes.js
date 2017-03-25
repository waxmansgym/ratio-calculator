import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        console.log('YEAH');
    this.toggle = this.toggle.bind(this);
  }

    toggle() {
        console.log('Toggling!');
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
      return (
        <div>
          <Button color="danger" onClick={this.toggle}>Notes</Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
            Notes Body...
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
}

export {Notes};
