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
                <span className="visible-sm visible-xs">
                    <div className="col-md-12" style={{display: 'table', margin: '0 auto'}}>
                        <strong>{this.props.name}</strong>
                        <input type="number" className="form-control" style={{textAlign: 'center'}} value={this.state.value} onChange={this.handleChange}/>
                    </div>
                </span>

                <span className="hidden-sm hidden-xs">
                    <strong>{this.props.name}</strong>
                    <input type="number" className="form-control" style={{textAlign: 'center'}} value={this.state.value} onChange={this.handleChange}/>
                </span>
            </span>
        );
    }
}

export {BaseLiftInput};
// vim: filetype=javascript.jsx
