import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <Button bsStyle="default" bsSize="large" onClick={this.open}> Notes </Button>

                <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id="notesbody">
                            <p>
                                Over years of training athletes, we've found that lift ratios can serve as powerful tools
                                for evaluating balance and guiding lifter development. By uncovering your biggest
                                imbalances, you can better prioritize problems and more effectively direct your
                                programming/training.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export {Notes};
// vim: ft=javascript.jsx
