import React, { Component } from 'react';
import {accessories} from '../data.js';

class AccessoryLiftIdeal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let ratio = accessories[this.props.base][this.props.name].ratio;
        let expected = '';
        let idealLabel = null;
        if(this.props.baseValue !== null) {
            expected = Math.round(ratio / 100 * this.props.baseValue);
            idealLabel = (<span className="visible-sm visible-xs" style={{paddingTop: '10px'}}><strong>Ideal</strong></span>);
        }

        return (
            <span>
                <div className="col-md-1 hidden-sm hidden-xs" style={{transform: 'translateY(50%)'}}><i>{idealLabel}{expected}</i></div>
                <div className="col-md-1 visible-sm visible-xs"><i>{idealLabel}{expected}</i></div>
            </span>
        );
    }
}

export {AccessoryLiftIdeal};
// vim: filetype=javascript.jsx