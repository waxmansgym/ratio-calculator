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
