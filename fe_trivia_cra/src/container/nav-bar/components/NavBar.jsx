import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authActions from '../../main/auth/actions/authActions';
import globalConstants from '../../../resources/globalConstants';
import '../styles/navbar.css';

// Navigation barre
function NavBar(props) {
    if (!sessionStorage.getItem(globalConstants.tokenKey)) {
        return (
            <div className="banner">
                <Link className="link-btn main-banner-link" to="/">{ 'Quiz Core' }</Link>
                <span className="auth-float">
                    <Link className="link-btn auth-banner-link" to="/login">Login</Link>
                    <Link className="link-btn auth-banner-link" to="/signup">Sign Up</Link>
                </span>
                <div className="buttons-bottom">
                    <Link className="feedback link-btn nav-banner-link" to="/feedback">Feedback</Link>
                    <Link className="leaderboards link-btn nav-banner-link" to="/leaderboards">Leaderboards</Link>
                    <Link className="patch-notes link-btn nav-banner-link" to="/patch_notes">What&#39;s new?</Link>
                </div>
            </div>
        );
    } else {
        let currentUsername;
        if (props.authState.user.username) {
            currentUsername = props.authState.user.username;
        } else if (sessionStorage.getItem('username')) {
            currentUsername = sessionStorage.getItem('username');
        } else {
            props.dispatch(authActions.logout());
        }

        return (
            <div className="banner">
                <Link className="link-btn main-banner-link" to="/">{ 'Quiz Core' }</Link>
                <span className="auth-float">
                    <div className="auth-banner-welcome">Welcome, { currentUsername }</div>
                    <hr/>
                    <Link onClick={() => props.dispatch(authActions.logout())} 
                        className="link-btn auth-banner-link" to="/login">Sign Off</Link>
                </span>
                <div className="buttons-bottom">
                    <Link className="feedback link-btn nav-banner-link" to="/feedback">Feedback</Link>
                    <Link className="leaderboards link-btn nav-banner-link" to="/leaderboards">Leaderboards</Link>
                    <Link className="patch-notes link-btn nav-banner-link" to="/patch_notes">What&#39;s new?</Link>
                </div>
            </div>
        );
    }
}

// Connect this class to application state
const mapStateToProps = state => {
    return {
        authState: state.authState
    };
};

// Validate prop types
NavBar.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(NavBar);