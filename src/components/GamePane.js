import React from 'react';
import PropTypes from 'prop-types';
import './GamePane.css';
import Question from './Question';
import AnswerPane from './AnswerPane'
import ProgressBar from './ProgressBar';
import Tracker from './Tracker';

const allotedTime = 15000;    // 15 seconds

class GamePane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {currentQuestion: null}
        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
    }

    // Is there gonna be a problem if the user hits an answer right as the timer is ending?

    handleQuestionAnswered(wasRight) {
        
    }

    componentWillMount() {
        this.setState({currentQuestion: this.props.nextQuestion()})
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
                    <ProgressBar allotedTime={allotedTime} onFinish={this.handleQuestionAnswered} />
                </div>
                <Tracker />
            </main>
        );
    }
}

GamePane.propTypes = {
    nextQuestion: PropTypes.func.isRequired
};

export default GamePane;
