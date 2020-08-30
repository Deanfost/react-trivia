import React from 'react';
import PropTypes from 'prop-types';
import './AnswerPane.css';

class AnswerPane extends React.Component {
    constructor(props) {
        super(props)

        this.handleOptionChosen = this.handleOptionChosen.bind(this);
    }

    handleOptionChosen(wasCorrect) {
        this.props.onAnswer(wasCorrect);
    }

    render() {
        return (
            <div className="AnswerPane">
                {this.props.choiceList.map((value, index) => (
                    <AnswerChoice
                        key={this.props.choiceIDs[index]}
                        choice={value}
                        isCorrect={index === this.props.correctIndex}
                        shouldReveal={this.props.answered}
                        onChosen={this.handleOptionChosen}
                    />
                ))}
            </div>
        );
    }
}

AnswerPane.propTypes = {
    choiceList: PropTypes.arrayOf(String).isRequired,
    choiceIDs: PropTypes.arrayOf(Number).isRequired,
    correctIndex: PropTypes.number.isRequired,
    onAnswer: PropTypes.func.isRequired,
    answered: PropTypes.bool.isRequired
};

class AnswerChoice extends React.Component {
    constructor(props) {
        super(props);

        this.state = { chosen: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!this.props.shouldReveal) {
            this.props.onChosen(this.props.isCorrect);
            this.setState({ chosen: true });
        }
    }

    render() {
        const shouldReveal = this.props.shouldReveal;
        const isCorrect = this.props.isCorrect;

        let classExpr = "AnswerPane__Choice";
        if (!shouldReveal) classExpr += " AnswerPane__Choice--Enabled";
        if (shouldReveal && isCorrect) classExpr += " AnswerPane__Choice--Correct";
        else if (shouldReveal && !isCorrect && this.state.chosen)
            classExpr += " AnswerPane__Choice--Incorrect";

        return (
            <div className={classExpr} onClick={this.handleClick}>
                <p>{this.props.choice}</p>
            </div>
        );
    }
};

AnswerChoice.propTypes = {
    choice: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    shouldReveal: PropTypes.bool.isRequired,
    onChosen: PropTypes.func.isRequired
}

export default AnswerPane;
