
import {BaseLift, Accessory, AccessoryRatioDisplay} from './CalcComponents.js';
import {isNumber} from './Helpers.js';

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

        this.accessories = {
            snatch: [
                {name: 'Overhead Press', ratio: 105},
                {name: 'Power Snatch', ratio: 80},
                {name: 'Snatch Blocks Abv Knee', ratio: 95},
            ],
            cnj: [
                { name: "Clean", ratio: 120 },
                { name: "Back Squat", ratio: 134}
            ]
        };

        this.accessoryMap = {};
        let accessoryState = { snatch: {}, cnj: {} };
        _.forEach(_.keys(this.accessories), (base) => {
            _.forEach(_.map(this.accessories[base], 'name'), (accessory) => {

                // Create a map from accessory name -> base name
                this.accessoryMap[accessory] = base;

                accessoryState[base][accessory] = {
                    value: null,
                    percent: null
                }
            })
        });

        this.state = { bases: {snatch: null, cnj: null}, accessories: accessoryState}
    }

    handleSubmit(event) {

        let accessoriesState = this.state.accessories;
        _.forEach(_.keys(accessoriesState), (base) => {
            let baseValue = this.state.bases[base];
            _.forEach(_.keys(accessoriesState[base]), (accessory) => {
                let accessoryValue = accessoriesState[base][accessory]['value'];
                console.log('BASS', base, baseValue, isNumber(baseValue));
                if(isNumber(baseValue) && isNumber(accessoryValue)) {
                    // Calculate the percentage of this lift vs the expected
                    accessoriesState[base][accessory]['percent'] = (accessoryValue / baseValue) * 100.0;
                }
                else {
                    accessoriesState[base][accessory]['percent'] = null;
                }
            });
        });

        this.setState({accessories: accessoriesState});

        console.log('Clicked', this.state);
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

        let snatchAccessories = this.accessories.snatch.map(
            (item) => (
                <span key={"span_" + item.name}>
                    <Accessory key={item.name} name={item.name} onChange={this.handleAccessoryChange}/>
                    <AccessoryRatioDisplay key={'ratio_' + item.name} expectedRatio={item.ratio} actualRatio={this.state.accessories.snatch[item.name].percent}/>
                </span>
            ));

        let cnjAccessories = this.accessories.cnj.map(
            (item) => (
                <span key={"span_" + item.name}>
                    <Accessory key={item.name} name={item.name} onChange={this.handleAccessoryChange}/>
                    <AccessoryRatioDisplay key={'ratio_' + item.name} expectedRatio={item.ratio} actualRatio={this.state.accessories.cnj[item.name].percent}/>
                </span>
            ));

        return (
            <div className="App">

              <div className="container">

                  <Panel header="Base Lifts">
                      <div className="row">
                        <div className="col-md-6">
                            <BaseLift name="Snatch" shortname="snatch" onChange={this.handleBaseChange}/>
                        </div>
                        <div className="col-md-6">
                            <BaseLift name="Clean & Jerk" shortname="cnj" onChange={this.handleBaseChange}/>
                        </div>
                      </div>
                  </Panel>

                   <Panel header="Accessories">
                      <div className="row">
                          <div className="col-md-6">
                              <div className="row">
                                  <div className="col-md-8"></div>
                                  <div className="col-md-2"><small>Actual %</small></div>
                                  <div className="col-md-2"><small>Expected %</small></div>
                              </div>
                          </div>

                          <div className="col-md-6">
                              <div className="row">
                                  <div className="col-md-8"></div>
                                  <div className="col-md-2"><small>Actual %</small></div>
                                  <div className="col-md-2"><small>Expected %</small></div>
                              </div>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-md-6"> {snatchAccessories} </div>
                          <div className="col-md-6"> {cnjAccessories} </div>
                      </div>
                   </Panel>

                   <center>
                       <button type="button" className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Evaluate Me</button>
                   </center>

              </div>
          </div>
      );
    }
}

export default App;
