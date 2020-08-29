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

        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
        this.handleTimerTick = this.handleTimerTick.bind(this);
    }

    // Is there gonna be a problem if the user hits an answer right as the timer is ending?

    initQuestionState() {
        // Set timer, request and init question
        const questionObject = this.props.nextQuestion();
        const choices = this.createChoices(questionObject.incorrectAnswers, questionObject.correctAnswer);
        let newState = {
            questionObject,
            timeRemaining: allotedTime,
            currTimer: setInterval(this.handleTimerTick, 1000),
            choiceList: choices.choiceList,
            correctIndex: choices.correctIndex,
            answered: false
        };
        this.setState(newState);
    }

    createChoices(incorrectAnswers, correctAnswer) {
        // Init the choices
        let correctIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
        let choiceList = incorrectAnswers.slice();
        choiceList.splice(correctIndex, 0, correctAnswer);
        return {choiceList, correctIndex};
    }

    handleQuestionAnswered(wasCorrect) {
        // Clear timer, update UI
        if (wasCorrect) {
            // Update Tracker
        }
        clearInterval(this.state.currTimer);
        this.setState({ currTimer: null, answered: true });

        // Init next question after delay
        // this.initQuestionState();
    }

    handleTimerTick() {
        const newTime = this.state.timeRemaining - 1;
        let newTimer = this.state.currTimer;
        let answered = false;
        if (newTime === 0) {
            clearInterval(this.state.currTimer);
            newTimer = null;
            answered = true;
        }
        this.setState({ timeRemaining: newTime, currTimer: newTimer, answered })
    }

    componentWillMount() {
        // Init first question
        this.initQuestionState();
    }
    
    render() {
        return (
            <main className="GamePane">
                <div className="GamePane__QA">
                    <Question
                        questionNumber={this.state.questionObject.number}
                        questionPrompt={this.state.questionObject.prompt}
                    />
                    <AnswerPane
                        choiceList={this.state.choiceList}
                        correctIndex={this.state.correctIndex}
                        onAnswer={this.handleQuestionAnswered}
                        answered={this.state.answered}
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
