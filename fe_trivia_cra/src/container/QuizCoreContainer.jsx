import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './nav-bar/components/NavBar';

// Main container component
const QuizCoreContainer = props => (
    <div>
        <NavBar />
        <span>{props.children}</span>
    </div>
);

QuizCoreContainer.propTypes = {
    children: PropTypes.node
};

export default QuizCoreContainer;