import React from 'react';
import PropTypes from 'prop-types';
import './GamePane.css';
import Question from './Question';
import AnswerPane from './AnswerPane'
import ProgressBar from './ProgressBar';
import Tracker from './Tracker';

const answeringTime = 15000;    // 15 seconds

class GamePane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="GamePane">
                <div className="GamePane__QA">
                    <Question 
                        questionNumber={this.props.questionNumber}
                        questionPrompt={this.props.questionPrompt}
                    />
                    <AnswerPane 
                        answers={this.props.answers} 
                        correctAnswer={this.props.correctAnswer}
                    />
                    <ProgressBar totalTime={answeringTime} elapsed={{}} />
                </div>
                <Tracker />
            </main>
        );
    }
}

GamePane.propTypes = {
    questionNumber: PropTypes.number.isRequired,
    questionPrompt: PropTypes.string.isRequired,
    questionAnswers: PropTypes.array.isRequired,
    correctAnswer: PropTypes.string.isRequired
};

export default GamePane;
