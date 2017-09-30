/* Waxman's Gym Ratio Calculator Copyright (C) 2017 Waxman's Gym

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

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
