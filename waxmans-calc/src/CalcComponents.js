import React, { Component } from 'react';
var _ = require('lodash');
import {isNumber} from './Helpers.js';

class BaseLift extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { 
        this.setState({value: event.target.value}); 
        this.props.onChange({name: this.props.shortname, value: event.target.value});
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
            <span>
                <div className="col-md-5">
                    <strong className="pull-right">{this.props.name}</strong>
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                </div>
            </span>

        );
    }
}

function percentColor(percent, start = 0, end = 120) {
    let a = percent / 100;
    let b = end * a;
    let c = b + start;

    return 'hsl('+c+',70%,40%)';
}
    

class AccessoryRatioDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let actualRatioLabel = <span></span>;
        let expectedRatioLabel = <span></span>;
        if(isNumber(this.props.actualRatio)) {
            let delta = Math.abs(this.props.actualRatio - this.props.expectedRatio);
            let dangerZone = 15;
            let percent = 100 - Math.min(Math.abs(delta / dangerZone * 100), 100);
            let color = percentColor(percent);

            actualRatioLabel = <span className="label label-default" style={{'backgroundColor': color}}>{this.props.actualRatio.toFixed(0)}%</span>;
            expectedRatioLabel = <span className="label label-default">{this.props.expectedRatio.toFixed(0)}%</span>;
        }

        return (
            <span>
                <div className="col-md-2">
                    {actualRatioLabel}
                </div>
                <div className="col-md-2">
                    {expectedRatioLabel}
                </div>
            </span>
        );
    }
}

export {BaseLift, Accessory, AccessoryRatioDisplay};
