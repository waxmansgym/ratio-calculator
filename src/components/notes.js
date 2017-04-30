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
                <Button bsStyle="default" onClick={this.open}> Notes </Button>

                <Modal show={this.state.showModal} onHide={this.close} aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id="notesbody">
                            <h3>1. Purpose of this Calculator</h3>
                            <p>
                                This calculator is designed to evaluate a lifter's current balance. 
                            </p>

                            <p>
                                In our methodology, balance refers to equal development of strength and technique. An
                                imbalanced lifter either has strength that outpaces his/her technique, technique that is
                                far superior to his/her strength, or technical abilities in one lift that do not match
                                his/her technical abilities in another.
                            </p>

                            <p>
                                Over years of training athletes, we've found that lift ratios can serve as powerful
                                tools for evaluating balance and guiding lifter development. By uncovering your biggest
                                imbalances, you can better prioritize problems, more effectively direct your
                                programming/training, and improve the likelihood of achieving your goals.
                            </p>

                            <h3>2. Basis for Analysis</h3>
                            <p>
                                The exercise and ratios we use for this calculator are based on information we
                                summarized in our 2017 article, <a href="http://www.waxmansgym.com/liftratios/">Those Magic Little Lift Ratios</a>.
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
