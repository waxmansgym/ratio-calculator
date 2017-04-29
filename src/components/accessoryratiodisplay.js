import React, { Component } from 'react';
import {isNumber} from '../helpers.js';
import {ranges} from '../data.js';

class AccessoryRatioDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if(!isNumber(this.props.actualRatio)) {
            return null;
        }

        // let x = Math.max(0, Math.min(100, (50 + this.props.actualRatio - this.props.expectedRatio))) + "%"

        let delta = this.props.actualRatio - this.props.expectedRatio;
        let x = Math.max(0, Math.min(100, 50 + (this.props.actualRatio - this.props.expectedRatio) / ranges.unacceptable * 50  )) + "%";
        let color = '';
        if(Math.abs(delta) < ranges.ideal) color = 'rgba(50, 255, 50, 1)';
        else if(Math.abs(delta) < ranges.acceptable) color = 'rgba(255, 255, 50, 1)';
        else color = 'rgba(255, 80, 80, 1)';

        let format = (n) => {
            return (n>0?'+':'') + Math.round(n) + '%';
        }

        let isMultiline = Array.isArray(this.props.displayName.props.children);
        let verticalAlign = isMultiline ? '' : 'translateY(50%)';



        let expected = Math.round(this.props.expectedRatio / 100 * this.props.baseValue);
        let idealLabel = (
            <span>
                <div className="hidden-sm hidden-xs" style={{transform: 'translateY(50%)'}}><i>{expected}</i></div>
                <div className="visible-sm visible-xs"><i>Ideal: {expected}</i></div>
            </span>
        );

        return (
            <div className="row" style={{paddingTop: '8px', paddingBottom: '8px'}}>
                <div className="col-md-3 hidden-sm hidden-xs" style={{ transform: verticalAlign }}>
                    <strong>{this.props.displayName}</strong>
                </div>
                <div className="col-md-3 visible-sm visible-xs">
                    <strong>{this.props.displayName}</strong>
                </div>

                <div className="col-md-1"> {idealLabel} </div>
                <div className="col-md-8">
                    <svg width="80%" height="30" style={{overflow: 'visible'}}>
                        <line x1="0%" x2="100%" y1="50%" y2="50%" strokeWidth="1.5" stroke="rgba(0,0,0,1.0)"/>
                        <line x1="50%" x2="50%" y1="50%" y2="100%" strokeWidth="0.5" stroke="rgba(0,0,0,1.0)"/>
                        <circle cx={x} cy="50%" r={18} stroke="black" strokeWidth="1.5" fill={color}/>
                        <text x={x} y="50%" fontWeight="bold" fontSize="11" textAnchor="middle" alignmentBaseline="middle"> {format(delta)} </text>
                    </svg>
                </div>
            </div>
        );
    }
}

export {AccessoryRatioDisplay};
// vim: filetype=javascript.jsx
