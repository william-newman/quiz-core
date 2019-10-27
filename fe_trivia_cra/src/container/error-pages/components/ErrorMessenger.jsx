import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Display errors
class ErrorMessenger extends Component {
    constructor(props) {
        super(props);
        // Bind func
        this.getAuthErrors = this.getAuthErrors.bind(this);
    }

    // Pull in auth error state
    getAuthErrors() {
        return this.props.errAuth;
    }

    render() {
        let errorListAuth = this.getAuthErrors(); // get auth errors from state
        // Map through errors and display
        return (
            <div className="global-errors">
                {errorListAuth.map((err, i) => (
                    <p key={i}>{err}</p>
                ))}
            </div>
        );
    }
}

// Connect this class to application state
const mapStateToProps = state => {
    return {
        errAuth: state.authState.authErrors
    };
};

// Validate prop types
ErrorMessenger.propTypes = {
    errAuth: PropTypes.array
};

export default connect(mapStateToProps)(ErrorMessenger);
