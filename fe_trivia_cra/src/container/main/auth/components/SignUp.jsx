import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validUserSignUpData, checkValidRole, giveAdmin } from '../../../../services/userValidationService';
import globalConstants from '../../../../resources/globalConstants';
import '../styles/signup.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const passcode = event.target.passcode.value;
        const passcodeConfirm = event.target.passcodeConfirm.value;
        let roleCheck = event.target.role.value;
        let role = 'USER';

        const dataWithConfirm = {
            passcode,
            passcodeConfirm,
            username
        };

        // Validate data
        const inputErrors = validUserSignUpData(dataWithConfirm);

        if (checkValidRole(roleCheck)) {
            if (giveAdmin(roleCheck)) {
                role = 'ADMIN';
            } else {
                inputErrors.push('Invalid permissions, please leave blank');
            }
        }

        const signUpData = {
            passcode,
            role,
            username
        };

        if (inputErrors.length === 0) {
            this.props.dispatch(authActions.handleLogin(signUpData));
        } else {
            this.props.dispatch(authActions.throwAuthErrors(inputErrors));
        }
    }

    componentDidMount() {
        this.props.dispatch(authActions.throwAuthErrors([]));
    }

    // Pull in auth error state
    getAuthErrors() {
        return this.props.authState.authErrors;
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
                    <div className="signup-card">
                        <form onSubmit={this.handleSignUp}>
                            <h2 className="heading">Sign Up</h2>

                            <label htmlFor="username" className="label">
                Username
                            </label>
                            <input
                                type="username"
                                name="username"
                                className="form-input"
                                maxLength="12"
                                placeholder="Please enter your preferred username"
                                required
                            />

                            <label htmlFor="passcode" className="label">
                Passcode
                            </label>
                            <input
                                type="password"
                                name="passcode"
                                className="form-input"
                                placeholder="Choose a 3-6 digit passcode"
                                required
                            />

                            <input
                                type="password"
                                name="passcodeConfirm"
                                className="form-input"
                                placeholder="Confirm passcode"
                                required
                            />

                            <label htmlFor="role" className="label">
                Permissions
                            </label>
                            <input
                                type="password"
                                name="role"
                                className="form-input"
                                placeholder="May be left blank"
                                maxLength="12"
                            />

                            <button
                                type="submit"
                                className="btn btn-signup"
                            >
                Sign Up!
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
SignUp.propTypes = {
    authState: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SignUp);
