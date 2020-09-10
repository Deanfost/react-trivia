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

        this.state = {runningResults: []}
        this.getNextQuestionState = this.getNextQuestionState.bind(this);
        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
        this.handleTimerTick = this.handleTimerTick.bind(this);
    }

    getNextQuestionState() {
        // Set timer, request and init question
        const generatorState = this.props.nextQuestion();
        if (generatorState.done) {
            return null;
        } else {
            const questionObject = generatorState.value;
            const choices = this.createChoices(questionObject.incorrectAnswers, questionObject.correctAnswer);
            let newState = {
                questionObject,
                timeRemaining: allotedTime,
                currTimer: setInterval(this.handleTimerTick, 16.67),   // ~60 fps
                choiceList: choices.choiceList,
                correctIndex: choices.correctIndex,
                choiceIDs: choices.IDs,
                answered: false
            };
            return newState;
        }
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
            const newState = this.getNextQuestionState();
            if (!newState) {
                // Time to end the game
                const score = this.state.runningResults.reduce((accum, currentValue) => {
                    return currentValue ? accum + 1 : accum;
                }, 0);
                this.props.endGame(score);
            } else {
                this.setState(newState);
            }   
        }, 2000);
    }

    handleQuestionAnswered(wasCorrect) {
        // Otherwise, edge case where the time has already run out
        if (!this.state.answered) {
            // Clear timer, update UI
            clearInterval(this.state.currTimer);
            this.setState({ 
                currTimer: null, 
                answered: true, 
                runningResults: this.state.runningResults.concat([wasCorrect])
            });

            // Queue up next question
            this.delayedQuestionUpdate();
        }
    }

    handleTimerTick() {
        // Otherwise, edge case where the user has already answered
        if (!this.state.answered) {
            const newTime = this.state.timeRemaining - 0.01617;
            let newTimer = this.state.currTimer;
            let answered = false;
            let newResults = this.state.runningResults;
            if (newTime <= 0) {
                clearInterval(this.state.currTimer);
                newTimer = null;
                answered = true;
                newResults = this.state.runningResults.concat([false]);

                // Queue up next question
                this.delayedQuestionUpdate();
            }
            this.setState({ 
                timeRemaining: newTime, 
                currTimer: newTimer, 
                answered,
                runningResults: newResults
            });
        }
    }

    componentWillMount() {
        // Init first question
        this.setState(this.getNextQuestionState());
    }

    render() {
        const isMobile = window.innerWidth <= 700;
        let quesitonTimerProps = {hasTimer: isMobile};
        if (isMobile) {
            quesitonTimerProps.allotedTime = allotedTime;
            quesitonTimerProps.timeRemaining = this.state.timeRemaining;
        }
        return (
            <main className="GamePane">
                <div className="GamePane__QA">
                    <Question
                        questionNumber={this.state.questionObject.number}
                        questionPrompt={this.state.questionObject.prompt}
                        {...quesitonTimerProps}
                    />
                    <AnswerPane
                        choiceList={this.state.choiceList}
                        choiceIDs={this.state.choiceIDs}
                        correctIndex={this.state.correctIndex}
                        onAnswer={this.handleQuestionAnswered}
                        answered={this.state.answered}
                    />
                    {!isMobile && <ProgressBar allotedTime={allotedTime} timeRemaining={this.state.timeRemaining} />}
                </div>
                <Tracker 
                    currNumber={this.state.questionObject.number} 
                    runningResults={this.state.runningResults} 
                    questionCount={this.props.questionCount} 
                    currWasAnswered={this.state.answered}
                />
            </main>
        );
    }

    componentWillUnmount() {
        // Stop any running timers
        if (this.state.currTimer) clearInterval(this.state.currTimer);
    }
}

GamePane.propTypes = {
    nextQuestion: PropTypes.func.isRequired,
    questionCount: PropTypes.number.isRequired,
    endGame: PropTypes.func.isRequired
};

export default GamePane;
