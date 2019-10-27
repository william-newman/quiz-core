import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import globalConstants from '../../../../resources/globalConstants';
import '../styles/quiz-menu.css';

const QuizMenu = () => {    
    if (!sessionStorage.getItem(globalConstants.tokenKey)) {
        return <Redirect to="/login" />;
    } else {
        return ( 
            <div>
                <div className="big-button-contain">
                    <Link className="btn-margin" to="/stroop-easy">
                        <button type="button" className="big-btn easy" >Stroop test
                            <br /><br />
                    - Simple -
                        </button>
                    </Link>
                    <Link className="btn-margin" to="/stroop-medium">
                        <button type="button" className="big-btn medium" >Stroop test
                            <br /><br />
                    - Complex -
                        </button>
                    </Link>
                    <Link className="btn-margin" to="/stroop-hard">
                        <button type="button" className="big-btn hard">Stroop test
                            <br /><br />
                    - Insane -
                        </button>
                    </Link>
                </div>
                <div className="big-button-contain">
                    <button type="button" className="big-btn">Coming soon</button>
                </div>
            </div>
        );
    }
};

// Connect this class to application state
const mapStateToProps = state => {
    return {
        authState: state.authState
    };
};

// Validate prop types
QuizMenu.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(QuizMenu);
