import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/leaderboard.css';
import { leaderboardGetFetch } from '../actions/leaderboardActions';
import ScoreTable from './ScoreTable';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.scoreState = this.scoreState.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.dispatch(leaderboardGetFetch());
    }

    scoreState() {
        return this.props.leaderboardState.leaderboards;
    }

    render() {
        if (!this.props.leaderboardState.leaderboards[0]) {
            return (
                <h2 className="center leaderboard-header">
          Leaderboard data not found!
                </h2>
            );
        } else {
            const scoreData = this.scoreState();
            const stroopSimpleData = [];
            const stroopComplexData = [];
            const stroopInsaneData = [];
            let stroopSimpleCap = 0;
            let stroopComplexCap = 0;
            let stroopInsaneCap = 0;

            scoreData.sort((a, b) => {
                if (a.quizScore > b.quizScore) {
                    return -1;
                } else if (a.quizScore < b.quizScore) {
                    return 1;
                } else {
                    return 0;
                }
            });

            scoreData.forEach(score => {
                if (
                    score.quiz != null &&
          score.quiz.match('^Stroop Test - Easy$') &&
          stroopSimpleCap < 10
                ) {
                    stroopSimpleData.push(score);
                    stroopSimpleCap++;
                }

                if (
                    score.quiz != null &&
          score.quiz.match('^Stroop Test - Complex$') &&
          stroopComplexCap < 10
                ) {
                    stroopComplexData.push(score);
                    stroopComplexCap++;
                }

                if (
                    score.quiz != null &&
          score.quiz.match('^Stroop Test - Insane$') &&
          stroopInsaneCap < 10
                ) {
                    stroopInsaneData.push(score);
                    stroopInsaneCap++;
                }
            });

            return (
                <div>
                    <h2 className="center leaderboard-header">High Scores!</h2>
                    <div className="stroop-leader-container">
                        {/* <!-- Table 1 --> */}
                        <table
                            className="leaderboard-table stroop-leader-easy"
                            title="Stroop Test - Easy"
                        >
                            <caption className="leaderboard-table">
                                {stroopSimpleData[0].quiz}
                            </caption>
                            <tbody>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Score</th>
                                </tr>
                                {stroopSimpleData.map((scores, key) => {
                                    return (
                                        <ScoreTable key={key} rank={key + 1} scores={scores} />
                                    );
                                })}
                            </tbody>
                        </table>
                        <br />
                        {/* <!-- Table 2 --> */}
                        <table
                            className="leaderboard-table stroop-leader-complex"
                            title="Stroop Test - Complex"
                        >
                            <caption className="leaderboard-table">
                                {stroopComplexData[0].quiz}
                            </caption>
                            <tbody>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Score</th>
                                </tr>
                                {stroopComplexData.map((scores, key) => {
                                    return (
                                        <ScoreTable key={key} rank={key + 1} scores={scores} />
                                    );
                                })}
                            </tbody>
                        </table>
                        <br />

                        {/* <!-- Table 3 --> */}
                        <table
                            className="leaderboard-table stroop-leader-insane"
                            title="Stroop Test - Insane"
                        >
                            <caption className="leaderboard-table">
                                {stroopInsaneData[0].quiz}
                            </caption>
                            <tbody>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Score</th>
                                </tr>
                                {stroopInsaneData.map((scores, key) => {
                                    return (
                                        <ScoreTable key={key} rank={key + 1} scores={scores} />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Second set of tables --> */}
                    <div className="center">
                        <Link type="button" to="/">
              Home
                        </Link>
                        <button id="scroll-to-top" title="Go to top">
              Back to Top
                        </button>
                    </div>
                    <br />
                </div>
            );
        }
    }
}
// Connect this class to application state
const mapStateToProps = state => {
    return {
        leaderboardState: state.leaderboardState
    };
};

// Validate prop types
Leaderboard.propTypes = {
    leaderboardState: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Leaderboard);
