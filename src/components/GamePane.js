import React from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';
import './GamePane.css';
import Question from './Question';
import AnswerPane from './AnswerPane'
import ProgressBar from './ProgressBar';
import Tracker from './Tracker';

const allotedTime = 10;

class GamePane extends React.Component {
    constructor(props) {
        super(props);

        this.getNextQuestionState = this.getNextQuestionState.bind(this);
        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
        this.handleTimerTick = this.handleTimerTick.bind(this);
    }

    // Is there gonna be a problem if the user hits an answer right as the timer is ending?

    getNextQuestionState() {
        // Set timer, request and init question
        const questionObject = this.props.nextQuestion();
        const choices = this.createChoices(questionObject.incorrectAnswers, questionObject.correctAnswer);
        let newState = {
            questionObject,
            timeRemaining: allotedTime,
            currTimer: setInterval(this.handleTimerTick, 33.33),   // 30 fps
            choiceList: choices.choiceList,
            correctIndex: choices.correctIndex,
            choiceIDs: choices.IDs,
            answered: false
        };
        return newState;
    }

    createChoices(incorrectAnswers, correctAnswer) {
        // Init the choices
        let correctIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
        let choiceList = incorrectAnswers.slice();
        choiceList.splice(correctIndex, 0, correctAnswer);
        let IDs = [];
        for (let i = 0; i < choiceList.length; i++) IDs[i] = nextId();
        return { choiceList, correctIndex, IDs };
    }

    delayedQuestionUpdate() {
        setTimeout(() => {
            this.setState(this.getNextQuestionState());
        }, 2000);
    }

    handleQuestionAnswered(wasCorrect) {
        // Otherwise, edge case where the time has already run out
        if (!this.state.answered) {
            // Clear timer, update UI
            if (wasCorrect) {
                // Update Tracker
            }
            clearInterval(this.state.currTimer);
            this.setState({ currTimer: null, answered: true });

            // Queue up next question
            this.delayedQuestionUpdate();
        }
    }

    handleTimerTick() {
        // Otherwise, edge case where the user has already answered
        if (!this.state.answered) {
            const newTime = this.state.timeRemaining - 0.033;
            let newTimer = this.state.currTimer;
            let answered = false;
            if (newTime <= 0) {
                clearInterval(this.state.currTimer);
                newTimer = null;
                answered = true;

                // Queue up next question
                this.delayedQuestionUpdate();
            }
            this.setState({ timeRemaining: newTime, currTimer: newTimer, answered });
        }
    }

    componentWillMount() {
        // Init first question
        this.setState(this.getNextQuestionState());
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
                        choiceIDs={this.state.choiceIDs}
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
