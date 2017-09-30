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

        // Vertically center the label if it is only one line (but not in mobile view!)
        // let isMultiline = Array.isArray(this.props.displayName.props.children);
        // let verticalAlign = isMultiline ? '' : 'translateY(50%)';
        let verticalAlign = 'translateY(50%)';

        return (
            <span>
                <div className="col-md-6 hidden-sm hidden-xs" style={{ transform: verticalAlign }}>
                    <strong>{this.props.displayName}</strong>
                </div>
                <div className="col-md-6 visible-sm visible-xs">
                    <strong>{this.props.displayName}</strong>
                </div>

                <div className="col-md-4">
                    <div className="row visible-sm visible-xs">
                        <div className="col-md-12" style={{display: 'table', margin: '0 auto'}}>
                            <form>
                                <input type="number" className="form-control col-xs-2" value={this.state.value}
                                    style={{textAlign: 'center', verticalAlign: 'middle', paddingRight: '2px', paddingLeft: '2px', width: "100px"}} onChange={this.handleChange}/>
                            </form>
                        </div>
                    </div>

                    <div className="row hidden-sm hidden-xs">
                        <div className="col-md-12">
                            <form>
                                <input type="number" className="form-control col-xs-2" value={this.state.value}
                                    style={{textAlign: 'center', verticalAlign: 'middle', paddingRight: '2px', paddingLeft: '2px'}} onChange={this.handleChange}/>
                            </form>
                        </div>
                    </div>
                </div>
            </span>

        );
    }
}

export {AccessoryLiftInput};
// vim: filetype=javascript.jsx
