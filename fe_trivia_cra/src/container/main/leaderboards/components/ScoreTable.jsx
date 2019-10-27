import React from 'react';
import PropTypes from 'prop-types';

const ScoreTable = (props) => {
    return (
        <tr>
            <td>{props.rank}</td>
            <td>{props.scores.user.username}</td>
            <td>{props.scores.quizScore}</td>
        </tr>
    );
};

// Validate prop types
ScoreTable.propTypes = {
    rank: PropTypes.number,
    scores: PropTypes.object
};

export default ScoreTable;
