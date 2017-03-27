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
        let isMultiline = Array.isArray(this.props.displayName.props.children);
        let verticalAlign = isMultiline ? '' : 'translateY(50%)';
        return (
            <span>
                <div className="col-md-3" style={{ transform: verticalAlign }}>
                    <strong>{this.props.displayName}</strong>
                </div>
                <div className="col-md-2">

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
