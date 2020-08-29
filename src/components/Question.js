import PropTypes from 'prop-types';
import './Question.css';
import React from 'react';

const Question = props => (
    <div className="Question">
        <h1 className="Question__Header">Question {props.questionNumber}</h1>
        <p className="Question__Prompt">{props.questionPrompt}</p>
    </div>
);

Question.propTypes = {
    questionNumber: PropTypes.number.isRequired,
    questionPrompt: PropTypes.string.isRequired,
    hasTimer: PropTypes.bool.isRequired,
    allotedTime: PropTypes.number,
    timeRemaining: PropTypes.number
};

Question.defaultProps = {
    hasTimer: false
};

export default Question;
