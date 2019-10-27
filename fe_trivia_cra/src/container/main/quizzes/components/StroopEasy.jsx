import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import globalConstants from '../../../../resources/globalConstants';
import '../styles/stroop-easy.css';

class StroopEasy extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        if (!sessionStorage.getItem(globalConstants.tokenKey)) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div>
                    <div>
  Timer: { 'testTimer' }
                    </div>
                    <div className="stroop-container">
                        {/* <!-- Class is randomly generated, as is the word
    Word is used to determine correctness --> */}
                        <div >
                            <div className="splash-text" >
      Stroop Test - Easy
                            </div>
                        </div>
                        <div>
                            <div>
      RED</div>
                            <div>
      GREEN</div>
                            <div >
      BLUE</div>
                            <div>
      YELLOW</div>
                        </div>
                        <div className="splash-text">
                            { 'resultScreenMessage' }
                        </div>
                    </div>
                    <div className="info-panel">
                        <div>
                            <div id="stroop-input">Press Enter to Begin!</div>
                        </div>
                        <div className="info">
    - Don&#39;t miss more than ten!<br />
    - You have 30 seconds!<br />
                            <hr />
                        </div>
                        <div className="controls">
    &quot;R&quot; for RED <br />
    &quot;G&quot; for GREEN <br />
    &quot;B&quot; for BLUE <br />
    &quot;Y&quot; for YELLOW
                        </div>
                        { 'answerFeedback' }
                        <div>
    Correct: { 'numOfCorrectAnswers' }
                        </div>
                    </div>
                    <div className="test-results">
                        <div>
    Congrats! <br />
    You scored { 'numOfCorrectAnswers' } correct answers in 30 seconds and missed { 'numOfIncorrectAnswers' }!
                        </div>
                        <div>
                            <button type="button" >Try Again</button>
                        </div>
                        <div>
                            { 'errorMessage' }
                        </div>
                    </div>
                    <hr className="rule" />
                    <div>
                        <button type="button" routerLink="/">Abandon Quiz</button>
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
StroopEasy.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(StroopEasy);
