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

class AccessoryHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <span>
                <div className="row hidden-sm hidden-xs">
                    <div className="col-md-3"><small><b>Accessory</b></small></div>
                    <div className="col-md-1"><small><b>Ideal</b></small></div>
                    <div className="col-md-8 hidden-sm hidden-xs"><small><b>Your Variance</b></small></div>
                    <div className="col-md-8 visible-sm visible-xs"><small><b>Variance</b></small></div>
                </div>
                <div className="row hidden-sm hidden-xs">
                    <div className="col-md-12">
                        <hr/>
                    </div>
                </div>
            </span>
        );
    }
};

export {AccessoryHeader};
// vim: filetype=javascript.jsx
