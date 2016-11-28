
import {BaseResults, AccessoryResults, BaseLiftInput, AccessoryLiftInput, AccessoryRatioDisplay} from './components.js';
import {isNumber} from './helpers.js';
import {accessories} from './data.js';

import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import './App.css';
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

        this.setState({
            accessories: accessoriesState,
            results: results
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
            <div className="row" key={"row_" + accessory}>
                <AccessoryLiftInput key={accessory} name={accessory} onChange={this.handleAccessoryChange}/>
                <AccessoryRatioDisplay key={'ratio_' + accessory} expectedRatio={accessories.snatch[accessory].ratio} actualRatio={this.state.accessories.snatch[accessory].percent}/>
            </div>
        ));

        // Create the cnj accessory inputs / displays
        let cnjAccessories = _.map(_.keys(accessories.cnj), (accessory) => (
            <div className="row" key={"row_" + accessory}>
                <AccessoryLiftInput key={accessory} name={accessory} onChange={this.handleAccessoryChange}/>
                <AccessoryRatioDisplay key={'ratio_' + accessory} expectedRatio={accessories.cnj[accessory].ratio} actualRatio={this.state.accessories.cnj[accessory].percent}/>
            </div>
        ));

        return (
            <div className="App">

                <div className="container">

                    <div className="row"><div className="col-md-12">
                        <h3>1. Start here. Enter your best snatch and/or clean & jerk:</h3>
                        <Panel header="Base Lifts">
                            <div className="row">
                                <div className="col-md-6">
                                    <BaseLiftInput name="Snatch" shortname="snatch" onChange={this.handleBaseChange}/>
                                </div>
                                <div className="col-md-6">
                                    <BaseLiftInput name="Clean & Jerk" shortname="cnj" onChange={this.handleBaseChange}/>
                                </div>
                            </div>
                        </Panel>
                    </div></div>

                    <div className="row">
                        <h3>2. Next, enter your known bests for any/all of the following:</h3>
                        <div className="col-md-6">
                            <Panel header="Snatch Exercises">
                                {snatchAccessories}
                            </Panel>
                        </div>

                        <div className="col-md-6">
                            <Panel header="C&J Exercises">
                                {cnjAccessories}
                            </Panel>
                        </div>
                    </div>

                    <div className="row">
                         <div className="col-md-12">
                             <h3>3. Click the button to perform analysis:</h3>
                             <button type="button" className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Evaluate Me</button>
                         </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <BaseResults results={this.state.results.base} show={this.state.results.calculated}/>
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
          </div>
      );
    }
}

export default App;
