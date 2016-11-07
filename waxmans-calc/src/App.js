import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import './App.css';
var _ = require('lodash');

class BigLift extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { 
        this.setState({value: event.target.value}); 
        this.props.onChange({name: this.props.name, value: event.target.value});
    }

    render() {
        return(
            <span>
                <strong>{this.props.name}</strong>
                <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
            </span>
        );
    }
}

class Accessory extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { 
        this.setState({value: event.target.value}); 
        this.props.onChange({name: this.props.name, value: event.target.value});
    }

    render() {
        // let actualRatioLabel = <span className="label label-default">{this.props.actualRatio.toFixed(2)}%</span>;
        // let expectedRatioLabel = <span className="label label-default">{this.props.expectedRatio.toFixed(2)}%</span>;

        let actualRatioLabel = <span className="label label-default">%</span>;
        let expectedRatioLabel = <span className="label label-default">%</span>;
        return (
            <div className="row">
                <div className="col-md-6">
                    <strong className="pull-right">{this.props.name}</strong>
                </div>
                <div className="col-md-4">
                    <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                </div>
                <div className="col-md-1">
                {actualRatioLabel}
                </div>
                <div className="col-md-1">
                {expectedRatioLabel}
                    
                </div>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { snatch: null, cnj: null}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccessoryChange = this.handleAccessoryChange.bind(this);
        this.handleSnatchChange = this.handleSnatchChange.bind(this);
        this.handleCNJChange = this.handleCNJChange.bind(this);

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
    }

    handleSubmit(event) {
        console.log('Clicked', this.state, this.props.children);
    }

    handleAccessoryChange(event) {
        let newState = {}
        newState['accessory_' + event.name] = event.value;
        this.setState(newState);
    }

    handleSnatchChange(event) { this.setState({snatch: event.value}); }
    handleCNJChange(event) { this.setState({cnj: event.value}); }

    render() {

        let snatchAccessories = this.accessories.snatch.map( (item) => <Accessory key={item.name} name={item.name} onChange={this.handleAccessoryChange} expectedRatio={item.ratio} /> );
        let cnjAccessories = this.accessories.cnj.map( (item) => <Accessory key={item.name} name={item.name} onChange={this.handleAccessoryChange} expectedRatio={item.ratio} /> );

        return (
            <div className="App">

              <div className="container">

                  <Panel header="Big Lifts">
                      <div className="row">
                        <div className="col-md-6">
                            <BigLift name="Snatch" onChange={this.handleSnatchChange}/>
                        </div>
                        <div className="col-md-6">
                            <BigLift name="Clean & Jerk" onChange={this.handleCNJChange}/>
                        </div>
                      </div>
                  </Panel>

                   <Panel header="Accessories">
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
