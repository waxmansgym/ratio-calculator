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

import {AccessoryHeader} from './components/accessoryheader.js';
import {AccessoryFooter} from './components/accessoryfooter.js';
import {BaseLiftInput} from './components/baseliftinput.js';
import {AccessoryLiftInput} from './components/accessoryliftinput.js';
import {AccessoryRatioDisplay} from './components/accessoryratiodisplay.js';
import {BaseResults} from './components/baseresults.js';
import {AccessoryResults} from './components/accessoryresults.js';
import {Notes} from './components/notes.js';
import {isNumber, urlParams, encodeName} from './helpers.js';
import {accessories} from './data.js';
import $ from 'jquery';

import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

var _ = require('lodash');

class App extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccessoryChange = this.handleAccessoryChange.bind(this);
        this.handleBaseChange = this.handleBaseChange.bind(this);
		this.getLinkURL = this.getLinkURL.bind(this);
		this.closeLinkModal = this.closeLinkModal.bind(this);
		this.copyLink = this.copyLink.bind(this);

		let params = urlParams();

		// Are any fields preloaded from the URL?
		let preloaded = false;

        this.accessoryMap = {};
        let accessoryState = { snatch: {}, cnj: {} };
        _.forEach(_.keys(accessories), (base) => {
            _.forEach(_.keys(accessories[base]), (accessory) => {

                // Create a map from accessory name -> base name
                this.accessoryMap[accessory] = base;

                accessoryState[base][accessory] = {
                    value: null,
                    percent: null
                }
				let accessoryEncodedName = encodeName(accessory);
				if(_.has(params, accessoryEncodedName)) {
					accessoryState[base][accessory]['value'] = params[accessoryEncodedName];
					preloaded = true;
				}
            })
        });

		let snatchValue = null;
		if(_.has(params, 'snatch')) {
			snatchValue = params['snatch']
			preloaded = true;
		}

		let cnjValue = null;
		if(_.has(params, 'cnj')) {
			cnjValue = params['cnj']
			preloaded = true;
		}

        this.state = {
            scrolled: false,
            bases: {snatch: snatchValue, cnj: cnjValue},
            accessories: accessoryState,
            results: {
                calculated: false,
                base: {snatch: null, cnj: null},
                accessories: {
                    snatch: null,
                    cnj: null
                }
            },
			preloaded: preloaded,
			computed: false,
			// linkURL: null,
			shortLinkURL: '',
            copySuccessIcon: (<p>&nbsp;</p>)
        }
    }

	componentDidMount() {
		if(this.state.preloaded) {
			this.handleSubmit();
		}
	}

    handleSubmit(event) {
        let accessoriesState = this.state.accessories;

        let results = {
            calculated: true,
            base: {
                snatch: this.state.bases['snatch'],
                cnj: this.state.bases['cnj']
            },
            accessories: {
                snatch: {},
                cnj: {}
            }

        }

        // Loop over each base
        _.forEach(_.keys(accessoriesState), (base) => {
            let baseValue = this.state.bases[base];

            // Loop over each accessory
            _.forEach(_.keys(accessoriesState[base]), (accessory) => {

                let accessoryValue = accessoriesState[base][accessory]['value'];
                if(isNumber(baseValue) && isNumber(accessoryValue)) {
                    // Calculate the percentage of this lift vs the expected
                    accessoriesState[base][accessory]['percent'] = (accessoryValue / baseValue) * 100.0;

                    results.accessories[base][accessory] = {
                        ratio: accessories[base][accessory]['ratio'],
                        value: accessoryValue
                    };
                }
                else {
                    accessoriesState[base][accessory]['percent'] = null;
                }
            });
        });

        if(!this.state.scrolled)
            setTimeout(()=>document.getElementById("analysis").scrollIntoView({behavior: "smooth"}), 0);

        this.setState({
            accessories: accessoriesState,
            results: results,
            scrolled: true,
			computed: true
        });

		let params = {};
		if(isNumber(this.state.bases.snatch)) {
			params.snatch = this.state.bases.snatch;
		}

		if(isNumber(this.state.bases.cnj)) {
			params.cnj = this.state.bases.cnj;
		}

		_.keys(this.state.accessories.cnj).forEach(accessory => {
			let value = this.state.accessories.cnj[accessory]['value'];
			if(isNumber(value)) { params[encodeName(accessory)] = value; }
		});

		_.keys(this.state.accessories.snatch).forEach(accessory => {
			let value = this.state.accessories.snatch[accessory]['value'];
			if(isNumber(value)) { params[encodeName(accessory)] = value; }
		});

		// let urlParams = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
		// let linkURL = window.location.href.split('?')[0] + '?' + urlParams;

		this.setState({
			urlParams: params,
			// linkURL: linkURL,
			shortLinkURL: ''
		});
    }

    handleAccessoryChange(event) {
        let base = this.accessoryMap[event.name];
        let newState = {accessories: this.state.accessories};
        newState.accessories[base][event.name]['value'] = event.value;
        this.setState(newState);
    }

    handleBaseChange(event) {
        let basesState = this.state.bases;
        basesState[event.name] = event.value;
        this.setState({bases: basesState});
    }

	getLinkURL() {
		let data = this.state.urlParams;
		let params = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
		let linkURL = (window.location.href.split('?')[0] + '?' + params).replace('#', '');

        this.setState({shortLinkURL: 'Creating link...'});
        let shortener_hostname = document.location.hostname;
        if(shortener_hostname === 'localhost') {
            shortener_hostname = 'waxmans.r-c-v.com';
        }
        let shortener = shortener_hostname + '/calcshrtn.php';
		$.ajax({
            url: 'http://' + shortener,
			type: "POST",
			data: JSON.stringify({
				"destination" : linkURL,
			}),
			headers: {
				"Content-Type": "application/json"
			},
			dataType: "json",
			success: function (link) {
				this.setState({shortLinkURL: link.shortLinkURL});
			}.bind(this)
		});
	}

    closeLinkModal() {
        this.setState({
            shortLinkURL: '',
            copySuccessIcon: (<p>&nbsp;</p>)
        });
    }

    copyLink() {
        var copyText = document.getElementById("shortLink");
        copyText.select();
        document.execCommand("Copy");
        window.getSelection().removeAllRanges();
        this.setState({copySuccessIcon: (<p>&#10003;</p>)});
    }

    render() {
        // Create the snatch accessory inputs / displays
        let snatchAccessories = _.map(_.keys(accessories.snatch), (accessory) => (
            <span key={"span_" + accessory}>
                <div className="row" key={"row_" + accessory}>
                    <AccessoryLiftInput key={accessory} name={accessory} value={this.state.accessories['snatch'][accessory]['value']} displayName={accessory} onChange={this.handleAccessoryChange}/>
                </div>
                <div className="row" key={"row_" + accessory + "_extra"}>
                    <div className="col-md-12"><hr className="visible-sm visible-xs"/><span className="hidden-sm hidden-xs">&nbsp;</span></div>
                </div>
            </span>
        ));

        let snatchRatioDisplays = _.map(_.keys(accessories.snatch), (accessory) => (
                <AccessoryRatioDisplay key={'ratio_' + accessory} expectedRatio={accessories.snatch[accessory].ratio}
                    actualRatio={this.state.accessories.snatch[accessory].percent} displayName={accessories.snatch[accessory].display}
                    accessoryValue={this.state.accessories.snatch[accessory].value} baseValue={this.state.results.base.snatch}/>
        ));

        // Create the cnj accessory inputs / displays
        let cnjAccessories = _.map(_.keys(accessories.cnj), (accessory) => (
            <span key={"span_" + accessory}>
                <div className="row" key={"row_" + accessory}>
                    <AccessoryLiftInput key={accessory} name={accessory} value={this.state.accessories['cnj'][accessory]['value']} displayName={accessory} onChange={this.handleAccessoryChange}/>
                </div>
                <div className="row" key={"row_" + accessory + "_extra"}>
                    <div className="col-md-12"><hr className="visible-sm visible-xs"/><span className="hidden-sm hidden-xs">&nbsp;</span></div>
                </div>
            </span>
        ));

        let cnjRatioDisplays = _.map(_.keys(accessories.cnj), (accessory) => (
                <AccessoryRatioDisplay key={'ratio_' + accessory} expectedRatio={accessories.cnj[accessory].ratio}
                    actualRatio={this.state.accessories.cnj[accessory].percent} displayName={accessories.cnj[accessory].display}
                    accessoryValue={this.state.accessories.cnj[accessory].value} baseValue={this.state.results.base.cnj} />
        ));

		let generateLinkButton = null;
		if(this.state.computed) {
			generateLinkButton = (
                <button type="button" className="btn btn-success btn-lg" onClick={this.getLinkURL}>SAVE / SHARE<br/>THIS ANALYSIS</button>
			);
		}

        let shortLinkStyle = {
            border: '0px',
            backgroundColor: '#fee',
            textAlign: 'center',
            fontSize: '30px',
            height: '40px',
            fontWeight: 'bold',
        };

        return (

            <div className="App text-center">

                <div className="static-modal">

                    <Modal show={this.state.shortLinkURL !== ''} onHide={this.closeLinkModal}>
                        <Modal.Body style={{'backgroundColor': '#fee'}}>
                            <div className="text-center">
                            <p>Here is a link to your current results.</p>
                            <p>Copy it to share or save for later.</p>
                            <input style={shortLinkStyle} id="shortLink" readOnly={true} value={this.state.shortLinkURL}/>
                            <br/>
                            <br/>
                            <a style={{color: 'black', cursor: 'pointer'}} onClick={this.copyLink}>Click here to copy link to clipboard</a>
                            {this.state.copySuccessIcon}
                            <Button bsSize="small" onClick={this.closeLinkModal}>Close</Button>
                        </div>
                        </Modal.Body>
                    </Modal>
                </div>

                <div className="container">


                    <div className="row visible-sm visible-xs">
                        <div className="col-md-12">
                            <img alt="Waxman's Gym" src="http://www.waxmansgym.com/ratio_calculator/img/wg_logo.png"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h1>Waxman's Gym Lift Ratio Calculator <small>v1.0-beta</small></h1>

                            <Notes/>

                        </div>
                    </div>

                    <div className="row"><div className="col-md-12">
                        <h3>1. Start here. Enter your best snatch and/or clean & jerk:</h3>
                        <Panel header="Base Lifts" bsStyle="danger">
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-3">
                                    <BaseLiftInput name="Snatch" value={this.state.bases.snatch} shortname="snatch" onChange={this.handleBaseChange}/>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-3">
                                    <BaseLiftInput name="Clean & Jerk" value={this.state.bases.cnj} shortname="cnj" onChange={this.handleBaseChange}/>
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                        </Panel>
                    </div></div>

                    <div className="row">
                        <h3>2. Next, enter your known bests for any/all of the following:</h3>
                        <div className="col-md-6">
                            <Panel header="Snatch Exercises" bsStyle="danger">
                                {snatchAccessories}
                            </Panel>
                        </div>

                        <div className="col-md-6">
                            <Panel header="C&J Exercises" bsStyle="danger">
                                {cnjAccessories}
                            </Panel>
                        </div>
                    </div>

                    <div className="row">
                         <div className="col-md-12">
                             <button type="button" className="btn btn-success btn-lg" onClick={this.handleSubmit}>Evaluate Me</button>
                         </div>
                     </div>

                    <div className="row" id="analysis" hidden={!this.state.results.calculated}>
                         <div className="col-md-12">
                             <h4>See <strong>below &darr;</strong> for analysis</h4>
                         </div>
                    </div>


                    <div className="row" style={{'paddingTop': '50px'}}>
                        <div className="col-md-12"> </div>
                    </div>

                    <div className="row" hidden={!this.state.results.calculated}>
                        <h3>3. Check out your results:</h3>
                    </div>

                    <div className="row" id="ratioDisplays">
                        <div className="col-md-6" id="snatchRatioDisplays">
                            <Panel bsStyle="danger" hidden={!this.state.results.calculated}>
                                <AccessoryHeader/>
                                {snatchRatioDisplays}
                                <AccessoryFooter/>
                            </Panel>
                        </div>

                        <div className="col-md-6" id="cnjRatioDisplays">
                            <Panel bsStyle="danger" hidden={!this.state.results.calculated}>
                                <AccessoryHeader/>
                                {cnjRatioDisplays}
                                <AccessoryFooter/>
                            </Panel>
                        </div>
                    </div>

                    <div className="row" id="baseResults">
                        <div className="col-md-12">
                            <BaseResults results={this.state.results.base} show={this.state.results.calculated} accessories={this.state.results.accessories}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <AccessoryResults
                            baseName="Snatch"
                                base={this.state.results.base.snatch}
                                accessories={this.state.results.accessories.snatch} show={this.state.results.calculated}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <AccessoryResults
                            baseName="Clean & Jerk"
                                base={this.state.results.base.cnj}
                                accessories={this.state.results.accessories.cnj} show={this.state.results.calculated}/>
                        </div>
                    </div>

					<div className="row">
						<div className="col-md-12">
							{generateLinkButton}
						</div>
					</div>

					<div className="row"><div className="col-md-12">&nbsp;</div></div>


                </div>
           <script src="src/lib/js/bootstrap.min.js"></script>
          </div>
      );
    }
}

export default App;
// vim: set ft=javascript.jsx
