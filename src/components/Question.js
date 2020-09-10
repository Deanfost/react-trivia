import PropTypes from 'prop-types';
import './Question.css';
import React from 'react';

const Question = props => {
    let timerContent = null;
    if (props.hasTimer) {
        const paddedString = String(Math.ceil(props.timeRemaining)).padStart(2, "0");
        const timerClassExpr = props.timeRemaining <= 0 ? "Question__Timer--Incorrect" : "Question__Timer--Neutral";
        timerContent = <h1 className={timerClassExpr}>0:{paddedString}</h1>
    }
    return (
        <div className="Question">
            <div className="Question__Header">
                <h1>Question {props.questionNumber}</h1>
                {timerContent}
            </div>
            <p className="Question__Prompt">{props.questionPrompt}</p>
        </div>
    );
}

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
