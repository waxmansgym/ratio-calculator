import React, { Component } from 'react';
import {ranges} from '../data.js';

class AccessoryFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let redxr = 50 + ranges.acceptable / ranges.unacceptable * 50 + '%';
        let redxl = 50 - ranges.acceptable / ranges.unacceptable * 50 + '%';

        let yellowxr = 50 + ranges.ideal / ranges.unacceptable * 50 + '%';
        let yellowxl = 50 - ranges.ideal / ranges.unacceptable * 50 + '%';

        return(
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-1"></div>
                <div className="col-md-8">

                    <svg width="80%" height={40} style={{overflow: 'visible'}}>

                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="userSpaceOnUse">
                                <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
                            </marker>
                        </defs>


                        <line x1={redxr} x2={redxr} y1="50%" y2="75%" strokeWidth="1" stroke="rgba(0, 0, 0, 1)"/>
                        <text x={redxr} y="100%" fontSize="9" textAnchor="middle" alignmentBaseline="middle"> {'+' + ranges.acceptable + '%'} </text>

                        <line x1={yellowxr} x2={yellowxr} y1="50%" y2="75%" strokeWidth="1" stroke="rgba(0, 0, 0, 1)"/>
                        <text x={yellowxr} y="100%" fontSize="9" textAnchor="middle" alignmentBaseline="middle"> {'+' + ranges.ideal + '%'} </text>

                        <line x1={redxl} x2={redxl} y1="50%" y2="75%" strokeWidth="1" stroke="rgba(0, 0, 0, 1)"/>
                        <text x={redxl} y="100%" fontSize="9" textAnchor="middle" alignmentBaseline="middle"> {'-' + ranges.acceptable + '%'} </text>

                        <line x1={yellowxl} x2={yellowxl} y1="50%" y2="75%" strokeWidth="1" stroke="rgba(0, 0, 0, 1)"/>
                        <text x={yellowxl} y="100%" fontSize="9" textAnchor="middle" alignmentBaseline="middle"> {'-' + ranges.ideal + '%'} </text>

                        <line x1="50%" x2="50%" y1="50%" y2="75%" strokeWidth="1" stroke="rgba(0, 0, 0, 1)"/>
                        <text x="50%" y="100%" fontSize="9" textAnchor="middle" alignmentBaseline="middle"> 0% </text>

                        <line x2="100%" x1={redxr} y1="50%" y2="50%" strokeWidth="4" stroke="rgba(255,0,0,1)" markerEnd="url(#arrow)"/>
                        <line x2="0%" x1={redxl} y1="50%" y2="50%" strokeWidth="4" stroke="rgba(255,0,0,1)" markerEnd="url(#arrow)"/>

                        <line x1={redxr} x2={yellowxr} y1="50%" y2="50%" strokeWidth="4" stroke="rgba(255,255,0,1)"/>
                        <line x1={redxl} x2={yellowxl} y1="50%" y2="50%" strokeWidth="4" stroke="rgba(255,255,0,1)"/>
                        <line x1={yellowxl} x2={yellowxr} y1="50%" y2="50%" strokeWidth="4" stroke="rgba(0,255,0,1)"/>


                    </svg>

                </div>
            </div>
        );
    }
}

export {AccessoryFooter};
// vim: filetype=javascript.jsx
