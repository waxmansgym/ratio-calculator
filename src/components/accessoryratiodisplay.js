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

        return (
            <div className="col-md-6" style={{overflow: 'visible'}}>

                <svg width="80%" height="30" style={{overflow: 'visible'}}>
                    <line x1="0%" x2="100%" y1="50%" y2="50%" strokeWidth="1.5" stroke="rgba(0,0,0,1.0)"/>

                    <line x1="50%" x2="50%" y1="50%" y2="100%" strokeWidth="0.5" stroke="rgba(0,0,0,1.0)"/>

                    <circle cx={x} cy="50%" r={18} stroke="black" strokeWidth="1.5" fill={color}/>

                    <text x={x} y="50%" fontWeight="bold" fontSize="11" textAnchor="middle" alignmentBaseline="middle"> {format(delta)} </text>

                </svg>
            </div>
        );
    }
}

export {AccessoryRatioDisplay};
// vim: filetype=javascript.jsx
