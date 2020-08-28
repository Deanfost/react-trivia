import React from 'react';
import PropTypes from 'prop-types';
import './GamePane.css';
import Question from './Question';
import AnswerPane from './AnswerPane'
import ProgressBar from './ProgressBar';
import Tracker from './Tracker';

const allotedTime = 10;

class GamePane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {currentQuestion: null}
        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
        this.handleTimerTick = this.handleTimerTick.bind(this);
    }

    // Is there gonna be a problem if the user hits an answer right as the timer is ending?

    handleQuestionAnswered(wasRight) {
        
    }

    handleTimerTick() {
        const newTime = this.state.timeRemaining - 1;
        let newTimer = this.state.currTimer;
        if (newTime === 0) {
            clearInterval(this.state.currTimer);
            newTimer = null;
        }
        this.setState({timeRemaining: newTime, currTimer: newTimer})
    }

    componentWillMount() {
        // Set timer, request first question
        let newState = {
            currentQuestion: this.props.nextQuestion(),
            timeRemaining: allotedTime,
            currTimer: setInterval(this.handleTimerTick, 1000)
        };
        this.setState(newState);
    }

    componentWillReceiveProps(_) {
        // Set timer for new incoming question
        this.setState({timeRemaining: allotedTime, currTimer: setInterval(this.handleTimerTick, 1000)});
    }

    render() {
        return (
            <main className="GamePane">
                <div className="GamePane__QA">
                    <Question 
                        questionNumber={this.state.currentQuestion.number}
                        questionPrompt={this.state.currentQuestion.prompt}
                    />
                    <AnswerPane 
                        incorrectAnswers={this.state.currentQuestion.incorrectAnswers}
                        correctAnswer={this.state.currentQuestion.correctAnswer}
                        onAnswer={this.handleQuestionAnswered}
                    />
                    <ProgressBar allotedTime={allotedTime} timeRemaining={this.state.timeRemaining} />
                </div>
                <Tracker />
            </main>
        );
    }

    componentWillUnmount() {
        // Stop any running timers
        if (this.state.currTimer) clearInterval(this.state.currTimer);
    }
}

GamePane.propTypes = {
    nextQuestion: PropTypes.func.isRequired
};

export default GamePane;
