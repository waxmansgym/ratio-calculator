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
import {isNumber} from './helpers.js';
import {accessories} from './data.js';

import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';

var _ = require('lodash');

class App extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccessoryChange = this.handleAccessoryChange.bind(this);
        this.handleBaseChange = this.handleBaseChange.bind(this);

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
            })
        });

        this.state = {
            scrolled: false,
            bases: {snatch: null, cnj: null},
            accessories: accessoryState,
            results: {
                calculated: false,
                base: {snatch: null, cnj: null},
                accessories: {
                    snatch: null,
                    cnj: null
                }
            }
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
            scrolled: true
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

    render() {

        // Create the snatch accessory inputs / displays
        let snatchAccessories = _.map(_.keys(accessories.snatch), (accessory) => (
            <span key={"span_" + accessory}>
                <div className="row" key={"row_" + accessory}>
                    <AccessoryLiftInput key={accessory} name={accessory} displayName={accessory} onChange={this.handleAccessoryChange}/>
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
                    <AccessoryLiftInput key={accessory} name={accessory} displayName={accessory} onChange={this.handleAccessoryChange}/>
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

        return (
            <div className="App text-center">

                <div className="container">

                    <div className="row visible-sm visible-xs">
                        <div className="col-md-12">
                            <img alt="Waxman's Gym" src="http://www.waxmansgym.com/ratio_calculator/img/wg_logo.png"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h1>Waxman's Gym Lift Ratio Calculator <small>v1.0</small></h1>

                            <Notes/>

                        </div>
                    </div>

                    <div className="row"><div className="col-md-12">
                        <h3>1. Start here. Enter your best snatch and/or clean & jerk:</h3>
                        <Panel header="Base Lifts" bsStyle="danger">
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-3">
                                    <BaseLiftInput name="Snatch" shortname="snatch" onChange={this.handleBaseChange}/>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-3">
                                    <BaseLiftInput name="Clean & Jerk" shortname="cnj" onChange={this.handleBaseChange}/>
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
                </div>
           <script src="src/lib/js/bootstrap.min.js"></script>
          </div>
      );
    }
}

export default App;
// vim: set ft=javascript.jsx
