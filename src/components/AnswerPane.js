import React from 'react';
import PropTypes from 'prop-types';
import './AnswerPane.css';

class AnswerPane extends React.Component {
    constructor(props) {
        super(props)

        this.handleOptionChosen = this.handleOptionChosen.bind(this);
    }

    initPanel(props) {
        // Init the choices
        let correctIndex = Math.floor(Math.random() * (props.incorrectAnswers.length + 1));
        let choiceList = props.incorrectAnswers.slice();
        choiceList.splice(correctIndex, 0, props.correctAnswer);
        this.setState({answered: false, choiceList, correctIndex});
    }

    handleOptionChosen(wasCorrect) {
        console.log(wasCorrect);
    }

    componentWillMount() {
        this.initPanel(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.incorrectAnswers != this.props.incorrectAnswers ||
            nextProps.correctAnswer != this.props.correctAnswer) {
                this.initPanel(nextProps);
            }
    }

    render() {
        return (
            <div className="AnswerPane">
                {this.state.choiceList.map((value, index) => (
                    <AnswerChoice 
                        choice={value}  
                        isCorrect={index === this.state.correctIndex}
                        shouldReveal={false}
                        index={index}
                        onChosen={this.handleOptionChosen}
                    />
                ))}
            </div>
        );
    }
}

AnswerPane.propTypes = {
    incorrectAnswers: PropTypes.arrayOf(String).isRequired,
    correctAnswer: PropTypes.string.isRequired,
    onAnswer: PropTypes.func.isRequired
};

class AnswerChoice extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onChosen(this.props.isCorrect);
    }

    render() {
        let classExpr = "AnswerPane__Choice";
        if (this.props.shouldReveal && this.props.isCorrect) classExpr += " AnswerPane__Choice--Correct";
        else if (this.props.shouldReveal && !this.props.isCorrect) classExpr += " AnswerPane__Choice--Incorrect";
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
    index: PropTypes.number.isRequired,
    onChosen: PropTypes.func.isRequired
}

export default AnswerPane;
