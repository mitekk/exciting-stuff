"use strict";

var React = require('react');
var Input = require('../common/textInput');

var AuthorForm = React.createClass({
    render: function () {
        return (
            <div>
                <form>
                    <h1>Manage Author</h1>
                    <Input
                        name="firstName"
                        label="First Name"
                        value={this.props.author.firstName}
                        onChange={this.props.onChange}
                        error={this.props.errors.firstName}
                    />
                    <Input
                        name="lastName"
                        label="Last Name"
                        value={this.props.author.lastName}
                        onChange={this.props.onChange}
                        error={this.props.errors.lastName}
                    />
                    <input type="submit" value="Save" onClick={this.props.onSave} className="btn btn-default" />
                </form>
            </div>
        );
    }
});

module.exports = AuthorForm;

// <label htmlFor="firstName">First Name</label>
// <input type="text"
//     name="firstName"
//     className="form-control"
//     placeholder="First Name"
//     ref="firstName"
//     onChange={this.props.onChange}
//     value={this.props.author.firstName} />
// <br />
// <label htmlFor="lastName">Last Name</label>
// <input type="text"
//     name="lastName"
//     className="form-control"
//     placeholder="Last Name"
//     ref="lastName"
//     onChange={this.props.onChange}
//     value={this.props.author.lastName} />
// <br />