import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

class Question extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Question">
                <h1 className="Question__Header">Question {this.props.questionNumber}</h1>
                <p className="Question__Prompt">{this.props.questionPrompt}</p>
            </div>
        );
    }
}

Question.propTypes = {
    questionNumber: PropTypes.number.isRequired, 
    questionPrompt: PropTypes.string.isRequired
};

export default Question;