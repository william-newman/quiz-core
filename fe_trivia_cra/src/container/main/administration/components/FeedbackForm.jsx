import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/feedback-form.css';

class FeedbackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.checkCurrentuser = this.checkCurrentuser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        //
    }

    checkCurrentuser() {
        return sessionStorage.getItem('username');
    }

    render() {
        let currentUser = this.checkCurrentuser();
        const feedbackErrors = [];

        if (currentUser === null) {
            currentUser = 'Anonymous';
        }

        if (currentUser) {
            return (
                <span>
                    <div className="container">
                        <div className="login-card">
                            <h2 className="heading">Feedback</h2>
                            <p>
                Submitting feedback as <b>{currentUser}</b>
                            </p>
                            <form className="login-form" onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Feedback Title"
                                    name="fb-title"
                                    className="form-input"
                                    required
                                />
                                <textarea
                                    type="text"
                                    placeholder="Feedback Body"
                                    name="fb-body"
                                    className="form-textarea"
                                    required
                                ></textarea>
                                <button type="submit" className="btn btn-login">
                  Send!
                                </button>
                            </form>

                            <div className="message-container">
                                <div className="errors">
                                    {feedbackErrors.map((err, i) => (
                                        <p key={i}>{err}</p>
                                    ))}
                                </div>
                                <Link to="/">
                                    <button className="btn">Home</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </span>
            );
        } else {
            return (
                <span>
                    <div className="message">
                        <p className="f-title">{'feedbackTitle'}</p>
                        <p className="f-body">{'feedbackBody'}</p>
                    </div>
                    <div className="message-container">
                        <div className="errors">
                            {feedbackErrors.map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                        <Link to="/">
                            <button>Home</button>
                        </Link>
                    </div>
                </span>
            );
        }
    }
}

// Connect this class to application state
const mapStateToProps = state => {
    return {
        feedbackState: state.feedbackState
    };
};

// Validate prop types
FeedbackForm.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(FeedbackForm);
