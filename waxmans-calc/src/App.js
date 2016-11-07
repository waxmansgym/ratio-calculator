import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import './App.css';

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
        return (
            <div className="row">
                <div className="col-md-6">
                    <strong className="pull-right">{this.props.name}</strong>
                </div>
                <div className="col-md-6">
                    <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
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
                          <div className="col-md-6">
                              <Accessory name="Overhead Squat"         based_on={this.state.snatch} ratio="105" onChange={this.handleAccessoryChange}/>
                              <Accessory name="Power Snatch"           based_on={this.state.snatch} ratio="80"  onChange={this.handleAccessoryChange}/>
                              <Accessory name="Snatch Blocks Abv Knee" based_on={this.state.snatch} ratio="95"  onChange={this.handleAccessoryChange}/>
                          </div>
                          <div className="col-md-6">
                              <Accessory name="Clean"         based_on={this.state.cnj} ratio="120" onChange={this.handleAccessoryChange}/>
                              <Accessory name="Back Squat"    based_on={this.state.cnj} ratio="134" onChange={this.handleAccessoryChange}/>
                          </div>
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
