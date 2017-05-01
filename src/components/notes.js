/* Waxman's Gym Ratio Calculator Copyright (C) 2017 Waxman's Gym

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

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

                            <h3>3. Reporting Bugs</h3>
                            <p>
                                Please send any issues to <a href="mailto:support@waxmansgym.com?Subject=Calculator">support@waxmansgym.com</a>.
                            </p>
                            <p>
                                For the technically inclined, you can also submit bugs on our <a href="https://github.com/waxmansgym/ratio-calculator/issues" target="_blank">Github Issue Tracker</a>. 
                            </p>

                            <hr/>

                            <p className="small text-muted">
                                You expressly acknowledge and agree that Waxman's Gym LLC and its
                                agents, affiliates, and associates make no representations or
                                warranties as to the suitability/safety of the information provided
                                here since we have no idea who you are or what your deal is. Prior
                                to participating in any program, activity, exercise discussed,
                                recommended, or suggested on this site, you should seek the advice
                                of your physician and/or other qualified professionals. At all
                                times, your reliance on the information, advice, ideas, and
                                suggestions on this page comes at your sole discretion and risk.
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
