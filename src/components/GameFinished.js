import React from 'react';
import PropTypes from 'prop-types';
import './GameFinished.css';

class GameFinished extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="GameFinished">
                <p className="GameFinished__Caption">Game finished!</p>
                <h1 className="GameFinished__Score">Your score: {this.props.score}/{this.props.totalQuestions}</h1>
                <div className="GameFinished__Button" onClick={this.props.onClick}>Play again</div>
            </div>
        );
    }
}

GameFinished.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default GameFinished;
