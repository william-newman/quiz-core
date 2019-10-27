import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validUserLoginData } from '../../../../services/userValidationService';
import globalConstants from '../../../../resources/globalConstants';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.turnOnLogin = this.turnOnLogin.bind(this);
        this.getAuthErrors = this.getAuthErrors.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(authActions.throwAuthErrors([]));
    }

    // Pull in auth error state
    getAuthErrors() {
        return this.props.authState.authErrors;
    }

    turnOnLogin() {
        this.props.dispatch(authActions.validLogin(true));
    }

    handleLogin(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const passcode = event.target.passcode.value;
        const loginData = {
            username,
            passcode,
            role: 'LOGIN'
        };

        // Validate data
        const validLogin = validUserLoginData(loginData);

        if (validLogin.length === 0) {
            this.props.dispatch(authActions.handleLogin(loginData));
        } else {
            this.props.dispatch(authActions.throwAuthErrors(validLogin));
        }
    }

    // Clear errors and disable submit button
    componentWillUnmount() {
        this.props.dispatch(authActions.throwAuthErrors([]));
        this.props.dispatch(authActions.validLogin(false));
    }

    render() {
        const authErrors = this.getAuthErrors(); // get auth errors from state

        if (sessionStorage.getItem(globalConstants.tokenKey)) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="container">
                    <div className="login-card">
                        <h2 className="heading">Log In</h2>
                        <form className="login-form" onSubmit={this.handleLogin}>
                            <input
                                type="username"
                                placeholder="Username"
                                name="username"
                                className="form-input"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Passcode"
                                name="passcode"
                                className="form-input"
                                onFocus={this.turnOnLogin}
                                required
                            />
                            <button
                                type="submit"
                                className="btn"
                                id="btn-login"
                                disabled={!this.props.authState.validLogin}
                            >
                Login!
                            </button>
                        </form>
                    </div>
                    <div className="error-container">
                        <div className="errors">
                            {authErrors.map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

// Connect this class to application state
const mapStateToProps = state => {
    return {
        authState: state.authState
    };
};

// Validate prop types
Login.propTypes = {
    authState: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Login);
