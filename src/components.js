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
                    <strong>{this.props.name}</strong>
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                </div>
            </span>

        );
    }
}

function percentColor(percent, alpha=1, start = 0, end = 120) {
    let a = percent / 100;
    let b = end * a;
    let c = b + start;

    return 'hsla('+c+',70%,40%,' + alpha + ')';
}
    

class AccessoryRatioDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // let actualRatioLabel = <span></span>;
        // let expectedRatioLabel = <span></span>;
        // if(isNumber(this.props.actualRatio)) {
        //     let delta = Math.abs(this.props.actualRatio - this.props.expectedRatio);
        //     let dangerZone = 15;
        //     let percent = 100 - Math.min(Math.abs(delta / dangerZone * 100), 100);
        //     let color = percentColor(percent);

        //     actualRatioLabel = <span className="label label-default" style={{'backgroundColor': color}}>{this.props.actualRatio.toFixed(0)}%</span>;
        //     expectedRatioLabel = <span className="label label-default">{this.props.expectedRatio.toFixed(0)}%</span>;
        // }
        //

         if(!isNumber(this.props.actualRatio)) {
             return null;
         }
        
        let x = Math.max(0, Math.min(100, (50 + this.props.actualRatio - this.props.expectedRatio))) + "%"

        let delta = Math.abs(this.props.actualRatio - this.props.expectedRatio);
        let dangerZone = 15;
        let percent = 100 - Math.min(Math.abs(delta / dangerZone * 100), 100);
        let color = percentColor(percent, 0.75);


                    //<rect x={5} y="25%" width="100%" height={3} color="blue"/>
         //<line x1={x} x2={x} y1="0%" y2="100%" strokeWidth="6" stroke="black"/>
        return (
            <div className="col-md-4">
                <svg width="100%" height={40}>
                    <line x1="0%" x2="100%" y1="50%" y2="50%" strokeWidth="1" stroke="rgba(0,0,0,0.5)"/>

                    <line x1="50%" x2="50%" y1="40%" y2="60%" strokeWidth="1" stroke="rgba(0,0,0,0.5)"/>

                    <circle cx={x} cy="50%" r={5} fill={color}/>

                </svg>
            </div>
        );

        // return (
        //     <span>
        //         <div className="col-md-2">
        //             <center>
        //                 {actualRatioLabel}
        //             </center>
        //         </div>
        //         <div className="col-md-2">
        //             <center>
        //                 {expectedRatioLabel}
        //             </center>
        //         </div>
        //     </span>
        // );
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

            let snatchCJIdealRatio = 80;
            let snatchCJRatioTolerance = 2;
            let snatchCJRatio = this.props.results.snatch / this.props.results.cnj * 100;

            let snatch = <strong>Snatch</strong>;
            let cnj = <strong>Clean & Jerk</strong>;
            let fs = <strong>Front Squat</strong>;

            // TODO: What should this message and tolerance be?
            if(Math.abs(snatchCJRatio - snatchCJIdealRatio) < snatchCJRatioTolerance) {
                resultContent = (
                    <span>
                        The ratio of your <strong>snatch</strong> to <strong>clean & jerk</strong> is within tolerance. Keep up the good work!
                    </span>
                );
            }
            else if(snatchCJRatio < snatchCJIdealRatio) {
                resultContent = (
                    <span>
                      Your <strong>snatch</strong> technique is inefficient,
                      you may benefit most from improving the efficiency of your <strong>snatch</strong>.
                    </span>
                );
            }
            else {
                if(this.props.accessories.cnj['Front Squat'] !== undefined) {

                    let fsqRatio = this.props.accessories.cnj['Front Squat'].value / this.props.results.cnj * 100;
                    let idealFsqRatio = this.props.accessories.cnj['Front Squat'].ratio;

                    if(fsqRatio > idealFsqRatio) {
                        resultContent = (
                            <span>
                                Your <strong>clean</strong> technique is
                                inefficient, you may benefit most from
                                improving the efficiency of your <strong>clean</strong>.
                            </span>);
                    } else {
                        resultContent = (
                            <span>
                                You are likely suffering from a strength problem,
                                you may benefit most from improving your strength
                                in the <strong>Front Squat</strong> and other
                                clean-related exercises.
                            </span>
                        ); }
                }
                else {
                    resultContent = (
                        <span>
                            Your {snatch} and {cnj} maxes are too close together.
                            Please enter a {fs} number so that we can further diagnose.
                        </span>
                    );
                }
            }

        }

        return (
            <span>
                <h3>4. Check out your results:</h3>
                <Panel header="Snatch Compared to C&J" bsStyle="danger">
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

        let analysisName = this.props.baseName + " Analysis";

        let resultsContent = null;
        if(results.length === 0) {
            resultsContent = (<span>Please enter one or more accessory maxes for analysis</span>);
        }
        else {
            let worst = _.maxBy(results, (r) => Math.abs(r.ratioDiff));
            let whichWay = worst.ratioDiff < 0 ? 'too_low' : 'too_high';

            resultsContent = (
                    <span>
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
                    </span>);
        }

        return (<Panel header={analysisName} bsStyle="danger">{resultsContent}</Panel>);
    }
}

export {BaseResults, AccessoryResults, BaseLiftInput, AccessoryLiftInput, AccessoryRatioDisplay};
