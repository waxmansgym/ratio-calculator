import React, { Component } from 'react';
var _ = require('lodash');
import {isNumber} from './helpers.js';
import Panel from 'react-bootstrap/lib/Panel';
import {diagnoses, prescriptions} from './data.js';

class BaseLiftInput extends Component {
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

class AccessoryLiftInput extends Component {
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
                    <center>
                        {actualRatioLabel}
                    </center>
                </div>
                <div className="col-md-2">
                    <center>
                        {expectedRatioLabel}
                    </center>
                </div>
            </span>
        );
    }
}

class BaseResults extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if(this.props.show === false) {
            return null;
        }

        let resultContent = "default string " + this.props.results.snatch + " " + this.props.results.cnj;
        if(!isNumber(this.props.results.snatch) || !isNumber(this.props.results.cnj)) {
            let missing = null;
            if(!isNumber(this.props.results.snatch) && !isNumber(this.props.results.cnj))
                missing = (<span><strong>Snatch</strong> or <strong>Clean & Jerk</strong></span>);
            else if(!isNumber(this.props.results.snatch) && isNumber(this.props.results.cnj))
                missing = (<strong>Snatch</strong>);
            else if(isNumber(this.props.results.snatch) && !isNumber(this.props.results.cnj))
                missing = (<strong>Clean & Jerk</strong>);
            resultContent = <span>You didn't enter a {missing} number so we can't perform this analysis</span>;
        }
        else {
            if(this.props.results.snatch === this.props.results.cnj) {
                resultContent = <span>Your <strong>Snatch</strong> and <strong>Clean & Jerk</strong> are the same. You should be ashamed.</span>;
            }
            else if(this.props.results.snatch > this.props.results.cnj) {
                resultContent = <span>Wow! your <strong>Snatch</strong> is better than your <strong>Clean & Jerk</strong>.</span>;
            }
            else {
                resultContent = <span>Oh my! your <strong>Clean & Jerk</strong> is better than your <strong>Snatch</strong>.</span>;
            }
        }

        return (
            <span>
                <h3>4. Check out your results:</h3>
                <Panel header="Snatch Compared to C&J">
                    {resultContent}
                </Panel>
            </span>
        );
    }
}

class AccessoryResults extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if(!isNumber(this.props.base)) {
            return null;
        }

        let results = _.map(this.props.accessories, (accessory, accessoryName) => {
            let actualRatio = accessory.value / this.props.base * 100;
            return {
                name: accessoryName,
                actualRatio: actualRatio,
                expectedRatio: accessory.ratio,
                ratioDiff: actualRatio - accessory.ratio
            };
        });

        let worst = _.maxBy(results, (r) => Math.abs(r.ratioDiff));

        let analysisName = this.props.baseName + " Analysis";

        let whichWay = worst.ratioDiff < 0 ? 'too_low' : 'too_high';

        console.log('WORST:', worst);
        if(!(worst.name in diagnoses) || !(worst.name in prescriptions)) {
            console.log('OH SHIT');
        }
        return (<Panel header={analysisName}>
                    <p>
                        Based on your inputs the ratio with the greatest difference is <strong>{worst.name}</strong>. 
                    </p>
                    <p>
                        The ideal is to have your <strong>{worst.name}</strong> at {worst.expectedRatio.toFixed(2)}% of your {this.props.baseName},
                        however your <strong>{worst.name}</strong> is at {worst.actualRatio.toFixed(2)}% of your {this.props.baseName}. That's a {worst.ratioDiff.toFixed(2)}% differential.
                    </p>
                    <p>
                        Diagnosis: {diagnoses[worst.name][whichWay]} 
                    </p>
                    <p>
                        Prescription: {prescriptions[worst.name][whichWay]} 
                    </p>
                </Panel>);


        return <span>
        {JSON.stringify(this.props)}
        </span>;
    }
}


export {BaseResults, AccessoryResults, BaseLiftInput, AccessoryLiftInput, AccessoryRatioDisplay};
