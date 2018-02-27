"use strict";

var React = require('react');

var Input = React.createClass({
    render: function () {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }
        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <input type="text"
                        name={this.props.name}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.value} />
                    <div className="input">{this.props.error}</div>
                </div>
                <br />
            </div>
        );
    }
});

module.exports = Input;