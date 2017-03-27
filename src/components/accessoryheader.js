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
                    <div className="col-md-3"></div>
                    <div className="col-md-2"><small><b>Input</b></small></div>
                    <div className="col-md-1"><small><b>Ideal</b></small></div>
                    <div className="col-md-6"><small><b>Variance</b></small></div>
                </div>
                <div className="row hidden-sm hidden-xs">
                    <div className="col-md-12">&nbsp;</div>
                </div>
            </span>
        );
    }
};

export {AccessoryHeader};
// vim: filetype=javascript.jsx
